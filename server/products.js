import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

function getCurrency(country) {
  return country === "NG" ? "ngn" : "gdp";
}

function getUnitAmount(country, gdp, ngn) {
  if (country === "NG") {
    return ngn * 100;
  }
  return gdp * 100;
}

export default async function createProducts(country) {
  console.log("yeah im killing it!");
  //ngn
  const productsData = [
    {
      name: "Starter Package",
      currency: getCurrency(country),
      description: "This is a basic subscription plan.",
      unitAmount: getUnitAmount(country, 500, 100000), // ₦5,000 in kobo
      productId: "prod_QeZIVdNOxOZEzk",
      lookUpKey: "starter_plan-f377473",
    },
    {
      name: "Standard Package",
      currency: getCurrency(country),
      description: "This is a standard subscription plan.",
      unitAmount: getUnitAmount(country, 1000, 200000), // ₦10,000 in kobo
      productId: "prod_Qdf9qxd0XU6DGJ",
      lookUpKey: "standard_plan-f377473",
    },
    {
      name: "Premium Package",
      currency: getCurrency(country),
      description: "This is a premium subscription plan.",
      unitAmount: getUnitAmount(country, 2000, 300000), // ₦20,000 in kobo
      productId: "prod_QeZuGqNssUDpBW",
      lookUpKey: "premium_plan-f377473",
    },
  ];

  //create products

  try {
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    productsData.forEach(async (productData) => {
      //create prices for products
      await stripe.prices.create({
        currency: productData.currency,
        unit_amount: productData.unitAmount,
        recurring: {
          interval: "month",
        },
        product: productData.productId,
        transfer_lookup_key: true,
        lookup_key: productData.lookUpKey,
      });
    });
  } catch (e) {
    console.log(`err message:${e}`);
  }
}
