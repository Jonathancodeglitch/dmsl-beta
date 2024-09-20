import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import {
  handleAddingNewSubscribersToAweber,
  handleNotifyingSubscribersOnUpcomingPayment,
  handleNotifyingCustomersOnFailedPayment,
} from "../aweberApiCalls.js";

dotenv.config();

const stripeWebhookRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
//customer should be able to cancel their subscription ==> pending
// when customer choose to cancel their sub display a page first that makes the subscription entizing and a cancel sub button if they still insist on cancelling ==> pending
// when sub is canceled send a mail telling them their sub has been canceled' ==> pending
// when  payment fails retry 6 times the 6th time should send a diffrent email about how their subscription would be canceledd ==> pending
// when payment is recieved send a mail about payment success ==> pending
// when subscription is canceled due to no payment  send a subscription cancel mail ==> pending
//work on the frontend ==> check
//use an online database ==> check

// stripe webhook logic

function formatDate(date) {
  const formatedDate = new Date(date * 1000).toDateString();
  return formatedDate;
}

//when a new subscription is created
async function handleNewSubscriptionCreated(subscription) {
  try {
    const subscriptionName = subscription.plan.name;
    const subscriptionRenewalDate = formatDate(subscription.current_period_end);
    // get the email and name from the customer
    const customerId = subscription.customer;
    const customer = await stripe.customers.retrieve(customerId);
    await handleAddingNewSubscribersToAweber(
      customer,
      subscriptionName,
      subscriptionRenewalDate
    );
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
      case "payment_intent.succeeded":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);

        break;
      case "invoice.payment_failed":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        handleFailedPayment(subscription);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`a new subscrition was created ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        handleNewSubscriptionCreated(subscription);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`a new subscrition was created ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        handleNewSubscriptionCreated(subscription);
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
