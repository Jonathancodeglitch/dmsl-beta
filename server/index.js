import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";
import bodyParser from "body-parser";
import createProducts from "./products.js";

dotenv.config();

const app = express();

//make the user location public
// if they are nigeria then use a nigeria pricing for them
// else use the pound pricing!!!

//app.use(express.json());

app.use(
  cors({
    origin: ["https://dmsl-beta-client.vercel.app", "http://localhost:5173"],
  })
); // Allow requests only from this domain

//find user location
function userLocation(req, res, next) {
  async function getUserLocation() {
    try {
      const userIp = req.headers["x-forwarded-for"] || req.ip;
      const response = await fetch(
        `https://ipinfo.io/${userIp}?token=521669d8ecf547`
      );
      if (response.ok) {
        const location = await response.json();
        req.userLocation = location.country;
      } else {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  }

  getUserLocation();

  next();
}

app.use(userLocation);

//send user location to the client side
app.get("/getUserLocation", express.json(), async (req, res) => {
  res.send({ location: req.userLocation });
  //create pricing base on location
  await createProducts(req.location);
});

//stripe checkout
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const lookupKeys = [
  "starter_plan-f377473",
  "standard_plan-f377473",
  "premium_plan-f377473",
];

app.post("/create-checkout-session", express.json(), async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      lookup_keys: [lookupKeys[req.body.id]],
      expand: ["data.product"],
    });

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: prices.data[0].id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.CLIENT_URL}/success-page`,
      cancel_url: process.env.CLIENT_URL,
    });

    //work on this later
    res.json({ url: session.url });
    //res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// stripe webhook logic
async function handleNewSubscriptionCreated(subscription) {
  const customerId = subscription.customer;
  const customer = await stripe.customers.retrieve(customerId);
  console.log(customer.email);
}

//get events on payment
app.post(
  "/webhook",
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
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "invoice.payment_failed":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`a new subscrition was created ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        handleNewSubscriptionCreated(subscription);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

const PORT = process.env.PORT || 8000;

app.listen(8000);
