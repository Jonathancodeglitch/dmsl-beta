import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import {
  handleAddingNewSubscribersToAweber,
  handleNotifyingSubscribersOnUpcomingPayment,
  handleNotifyingCustomersOnFailedPayment,
  handleNotifyingCustomerOnSucceededPayment,
  handleNotifyingCustomersOnCanceledSubscription,
} from "../aweberApiCalls.js";

dotenv.config();

const stripeWebhookRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
// send a link to manage your subscription when a welcome email,payment failed, cancel subscription is sent
//customer should be able to manage their subscription like cancel their subscription ==> pending
// when  payment fails retry 6 times the 6th time should send a diffrent email about how their subscription would be canceledd  using dashboard==> pending
// when payment is recieved send a mail about payment success use the dashboard ==> checked
// when subscription is canceled due to no payment  send a subscription cancel mail ==> pending
//work on the frontend ==> check
//use an online database ==> check
//free trial

// stripe webhook logic

function formatDate(date) {
  const formatedDate = new Date(date * 1000).toDateString();
  return formatedDate;
}

function retrieveAmountForSubscription(subscription) {
  const subscriptionItem = subscription.items.data[0]; // Get the first (and only) subscription item
  const price = subscriptionItem.price;
  const currency = price.currency.toUpperCase();
  const amount = price.unit_amount / 100;

  const formattedPrice = new Intl.NumberFormat(
    `${currency == "NGN" ? "en-NG" : "en-GB"}`,
    {
      style: "currency",
      currency: currency,
    }
  ).format(amount);

  return formattedPrice;
}

async function retrieveSubscription(subscriptionId) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  return subscription;
}

//when a new subscription is created
async function handleNewSubscriptionCreated(subscription) {
  try {
    // get the email and name from the customer
    const customerId = subscription.customer;
    const customer = await stripe.customers.retrieve(customerId);
    const subscriptionInfo = {
      productName: subscription.plan.name,
      customerName: customer.name,
      customerEmail: customer.email,
      productRenewalDate: formatDate(subscription.current_period_end),
      productBillingDate: formatDate(subscription.current_period_start),
      productAmount: retrieveAmountForSubscription(subscription),
      customerPortal: process.env.customer_portal,
    };

    await handleAddingNewSubscribersToAweber(subscriptionInfo);
  } catch (err) {
    console.log(err);
  }
}

//notify subscribers when their subscription would soon expire
async function handleUpcomingInvoice(subscription) {
  try {
    const customerId = subscription.customer;
    const customer = await stripe.customers.retrieve(customerId);
    handleNotifyingSubscribersOnUpcomingPayment(customer);
  } catch (err) {
    console.log(err);
  }
}

//handle failed payment
async function handleFailedPayment(subscription) {
  try {
    //Retrive  customer so we can get personal info on the name ,email
    const customerId = subscription.customer;
    const paymentIntentId = subscription.payment_intent;
    const customer = await stripe.customers.retrieve(customerId);
    // Retrieve the PaymentIntent by its ID so we can get why payment failed
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    //Retrive the payment invoice so we can get how many times we made made the payment
    // const invoice = await stripe.invoices.retrieve(subscription.invoices);
    // get the payment attempt from the invoices
    if (
      paymentIntent.status === "requires_payment_method" &&
      paymentIntent.last_payment_error
    ) {
      const error = paymentIntent.last_payment_error;
      // Extract the failure reason
      const failureReason =
        error.message || "Payment failed for an unknown reason";
      console.log(subscription);
      //handleNotifyingCustomersOnFailedPayment(failureReason, customer.email);
    } else {
      console.log("Payment did not fail or no error found.");
    }
  } catch (err) {
    console.log(err);
  }
}

async function handleSucceededPayment(subscription) {
  // Step 1: Retrieve the PaymentIntent
  const paymentIntent = await stripe.paymentIntents.retrieve(subscription.id);
  const customer = await stripe.customers.retrieve(subscription.customer);

  // Check if there's an invoice associated with the PaymentIntent
  if (paymentIntent.invoice) {
    // Step 2: Retrieve the Invoice
    const invoice = await stripe.invoices.retrieve(paymentIntent.invoice);

    // Check if the invoice is linked to a subscription
    if (invoice.subscription) {
      // Step 3: Retrieve the Subscription
      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription
      );

      handleNotifyingCustomerOnSucceededPayment({
        productRenewalDate: formatDate(subscription.current_period_end),
        productBillingDate: formatDate(subscription.current_period_start),
        customerEmail: customer.email,
      });
    } else {
      console.log("No subscription associated with this invoice.");
    }
  } else {
    handleNotifyingCustomerOnSucceededPayment({
      productRenewalDate: "no renewal date",
      productBillingDate: "no billing date",
      customerEmail: customer.email,
    });
    console.log("No invoice associated with this PaymentIntent.");
  }
}

async function handleSubscriptionCancelled(subscription) {
  const customerId = subscription.customer;
  const customer = await stripe.customers.retrieve(customerId);
  handleNotifyingCustomersOnCanceledSubscription(customer.email);
}

//get events on payment
stripeWebhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = process.env.END_POINT_SECRET;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case "invoice.paid":
        const invoice = event.data.object;
        status = invoice.status;
        const subscriptionId = invoice.subscription;
        subscription = retrieveSubscription(subscriptionId);

        if (invoice.billing_reason == "subscription_create") {
          //welcome new subscribers to the plan
          handleNewSubscriptionCreated(subscription);
          //send receipt to subscriber
          handleSucceededPayment(subscription);
        } else {
          //just send receipt(old subscriber)
          handleSucceededPayment(subscription);
        }

        break;
      case "invoice.payment_failed":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        handleFailedPayment(subscription);
        break;
      /* case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`a new subscrition was created ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        handleNewSubscriptionCreated(subscription);
        console.log(subscription);
        break; */
      case "customer.subscription.canceled":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`subscrition was canceled ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        handleSubscriptionCancelled(subscription);
        break;
      case "invoice.upcoming":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`invoice upcoming ${status}.`);
        // Then define and call a method to handle upcoming invoices.
        handleUpcomingInvoice(subscription);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

export default stripeWebhookRouter;
