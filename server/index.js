import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: ["https://dmsl-beta-client.vercel.app", "http://localhost:5173"],
  })
); // Allow requests only from this domain

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const offers = new Map([
  [1, { name: "STARTER PACKAGE", price: 50000, quantity: 1 }],
  [2, { name: "STANDARD PACKAGE", price: 100000, quantity: 1 }],
  [3, { name: "PREMIUN PACKAGE", price: 200000, quantity: 1 }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.packages.map((item) => {
        const offer = offers.get(item.id);
        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: offer.name,
            },
            unit_amount: offer.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success-page`,
      cancel_url: process.env.CLIENT_URL,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  try {
    const { session_id } = req.body;

    let result = Promise.all([
      stripe.checkout.sessions.retrieve(session_id, {
        expand: ["payment_intent.payment_method"],
      }),
      stripe.checkout.sessions.listLineItems(session_id),
    ]);

    res.json(await result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
});

const PORT = process.env.PORT || 3000;

app.listen(8000);
