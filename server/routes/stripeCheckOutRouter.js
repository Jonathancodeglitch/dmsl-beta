import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

//send email about support or cancellation to

dotenv.config();

const stripeCheckOutRouter = express.Router();
//stripe checkout initilizition
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
const lookupKeys = [
  "starter_plan-k377473",
  "standard_plan-k376473",
  "premium_plan-k377473",
];

stripeCheckOutRouter.post("/", express.json(), async (req, res) => {
  try {
    //if the location of the user is nigeria then charge them the special nigeria price
    //else the usual price in uk pounds
    const prices = await stripe.prices.list({
      lookup_keys:
        req.userLocation === "NG"
          ? [`${lookupKeys[req.body.id]}NG`]
          : [lookupKeys[req.body.id]],
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
      subscription_data: {
        trial_period_days: 14,
      },
    });

    //work on this later
    res.json({ url: session.url });
    //res.redirect(303, session.url);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default stripeCheckOutRouter;
