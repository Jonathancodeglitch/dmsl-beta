import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import {
  handleAddingNewSubscribersToAweber,
  handleNotifyingSubscribersOnUpcomingPayment,
  handleNotifyingCustomersOnFailedPayment,
  handleNotifyingCustomerOnSucceededPayment,
  handleNotifyingCustomersOnCanceledSubscription,
  handleNotifyingCustomersOnRenewedSubscription,
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
    const productId = subscription.items.data[0].plan.product;
    const customer = await stripe.customers.retrieve(customerId);
    const product = await stripe.products.retrieve(productId);

    const subscriptionInfo = {
      productName: product.name,
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
    const chargeId = subscription.charge;
    const paymentIntentId = subscription.payment_intent;
    const customer = await stripe.customers.retrieve(customerId);
    const charge = await stripe.charges.retrieve(chargeId);
    // Retrieve the PaymentIntent by its ID so we can get why payment failed
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    //Retrive the payment invoice so we can get how many times we made made the payment
    // const invoice = await stripe.invoices.retrieve(subscription.invoices);
    // get the payment attempt from the invoices

    console.log(charge.outcome.reason);

    /* if (
      paymentIntent.status === "requires_payment_method" &&
      paymentIntent.last_payment_error
    ) {
      const error = paymentIntent.last_payment_error;
      // Extract the failure reason
      const failureReason =
        error.message || "Payment failed for an unknown reason";
      console.log(subscription);
      handleNotifyingCustomersOnFailedPayment(failureReason, customer.email);
    } else {
      console.log("Payment did not fail or no error found.");
    } */
  } catch (err) {
    console.log(err);
  }
}

async function handleSucceededPayment(subscription) {
  // Step 1: Retrieve the PaymentIntent
  const customer = await stripe.customers.retrieve(subscription.customer);
  console.log("second function called");
  await handleNotifyingCustomerOnSucceededPayment({
    productRenewalDate: formatDate(subscription.current_period_end),
    productBillingDate: formatDate(subscription.current_period_start),
    customerEmail: customer.email,
  });
}

async function handleSubscriptionCancelled(subscription) {
  const customerId = subscription.customer;
  const customer = await stripe.customers.retrieve(customerId);
  if (subscription.cancel_at_period_end === true) {
    // Then define and call a method to handle the subscription updated.
    await handleNotifyingCustomersOnCanceledSubscription(customer.email);
  } else if (subscription.cancel_at_period_end === false) {
    await handleNotifyingCustomersOnRenewedSubscription(customer.email);
  }
}

//get events on payment
stripeWebhookRouter.post(
  "/",
  express.raw({ type: "application/json" }),
  async (request, response) => {
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
        subscription = await retrieveSubscription(subscriptionId);
        //welcome new subscribers to the plan
        await handleNewSubscriptionCreated(subscription);
        //send receipt to subscriber
        await handleSucceededPayment(subscription);
        break;
      case "invoice.payment_failed":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        await handleFailedPayment(subscription);
      case "customer.subscription.deleted":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`subscrition was canceled ${status}.`);
        // Then define and call a method to handle the subscription canceled.
        //await handleSubscriptionCancelled(subscription);
        break;
      case "customer.subscription.updated":
        subscription = event.data.object;
        status = subscription.status;
        await handleSubscriptionCancelled(subscription);
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
