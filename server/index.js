import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://dmsl-beta-client.vercel.app/"],
  })
);

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
            currency: "usd",
            product_data: {
              name: offer.name,
            },
            unit_amount: offer.price,
          },
          quantity: item.quantity,
        };
      }),
      success_url: process.env.CLIENT_URL,
      cancel_url: process.env.CLIENT_URL,
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(8000);
