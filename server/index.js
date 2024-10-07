import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userLocation from "./middlewares/location.js";
import stripeCheckOutRouter from "./routes/stripeCheckOutRouter.js";
import stripeWebhookRouter from "./routes/stripeWebhookRouter.js";
import { oAuth2FlowAweberRouter } from "./routes/aweberRouter.js";
import { sendContactUsFormMessage } from "./sendEmails.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://dmsl-beta-client.vercel.app", "http://localhost:5173"],
  })
); // Allow requests only from this domain

//get user location
app.use(userLocation);

//get data from contact us form
app.post("/contact-us", express.json(), async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    sendContactUsFormMessage({ email, subject, message });
    res.send("message received!!");
  } catch (error) {
    console.log("while get contact us form data", error);
    res.send("message not received!!");
  }
});

//send user location to the client side
app.get("/getUserLocation", express.json(), async (req, res) => {
  res.send({ location: req.userLocation });
});

//stripe checkout initilizition
app.use("/create-checkout-session", stripeCheckOutRouter);

//aweber OAUTH2 flow
app.use("/oauth2", oAuth2FlowAweberRouter);

//get events related to stripe account
app.use("/webhook", stripeWebhookRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
