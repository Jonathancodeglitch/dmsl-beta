import { retriveAccessTokenFromDb } from "./db.js";

//Get all subscribers
async function getSubscribers() {
  const Token = await retriveAccessTokenFromDb();
  try {
    const headers = {
      Accept: "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers`;
    return fetch(url, { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        return data.entries;
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
}

async function getSubscriberCustomField(subcriberEmail) {
  const subcribers = await getSubscribers();
  //find the subscriber that needs an update
  const [subcriber] = subcribers.filter((subcriber) => {
    return subcriber.email === subcriberEmail;
  });

  //get custom field from the subscriber
  const previousCustomField = subcriber.custom_fields;

  return previousCustomField;
}

// update a subscriber
async function updateSubscriberByEmail(customField, tags, email) {
  try {
    //Retrive subcriber from aweber so we can get the previous custom field and add our modification
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const body = JSON.stringify({
      custom_fields: customField,
      tags: tags,
    });

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers?subscriber_email=${email}`;
    fetch(url, { headers: headers, method: "PATCH", body: body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.custom_fields);
      });
  } catch (err) {
    console.log(err);
  }
}
//handle adding new subscribers to aweber
async function handleAddingNewSubscribersToAweber(subscriptionInfo) {
  try {
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const body = JSON.stringify({
      custom_fields: {
        product: subscriptionInfo.productName,
        product_renewal_date: subscriptionInfo.productRenewalDate,
        product_billing_date: subscriptionInfo.productBillingDate,
        customer_portal: subscriptionInfo.customerPortal,
        product_amount: subscriptionInfo.productAmount,
      },
      email: subscriptionInfo.customerEmail,
      name: subscriptionInfo.customerName,
      tags: ["welcome series"],
    });

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers`;
    fetch(url, { headers: headers, method: "POST", body: body })
      .then((response) => response)
      .then((data) => {
        console.log(data.status);
      });
  } catch (err) {
    console.log(err);
  }
}

//remeber to schedule when the notification is made on the dashboard
async function handleNotifyingSubscribersOnUpcomingPayment(subscriber) {
  //  get all subscribers from my emailList
  const Token = await retriveAccessTokenFromDb();

  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };
    const body = JSON.stringify({
      tags: {
        add: ["invoice upcoming"],
        //remove: ["worked", "invoice upcoming"],
      },
    });

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers?subscriber_email=${subscriber.email}`;
    fetch(url, { headers: headers, method: "PATCH", body: body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.status);
      });
  } catch (err) {
    console.log(err);
  }
}

//notify customers that their payment was a success
async function handleNotifyingCustomerOnSucceededPayment(subscriptionInfo) {
  console.log("i was called from succeeded payment");
  try {
    //Retrive subcriber from aweber so we can get the previous custom field and add our modification
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const subcribers = await getSubscribers();

    //find the subscriber that needs an update
    const [subcriber] = subcribers.filter((subcriber) => {
      return (
        subcriber.email === subscriptionInfo.customerEmail
      );
    });

    //get custom field from the subscriber
    const previousCustomField = subcriber.custom_fields;

    const body = JSON.stringify({
      custom_fields: {
        ...previousCustomField,
        product_renewal_date: subscriptionInfo.productRenewalDate,
        product_billing_date: subscriptionInfo.productBillingDate,
      },
      tags: {
        add: ["payment succeeded"],
      },
    });

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers?subscriber_email=jonathankendrick697@gmail.com`;
    fetch(url, { headers: headers, method: "PATCH", body: body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.custom_fields);
      });
  } catch (err) {
    console.log(err);
  }
}

//notify customers that their subscription has been cancelled
async function handleNotifyingCustomersOnCanceledSubscription(subscriberEmail) {
  console.log("i was called from canceled payment");
  //add tag to trigger the email
  const tags = {
    add: ["cancel subscription"],
  };

  const customField = await getSubscriberCustomField(
    "jonathankendrick697@gmail.com"
  );

  updateSubscriberByEmail(
    { ...customField },
    tags,
    "jonathankendrick697@gmail.com"
  );
}

//handleNotifyingCustomersOnCanceledSubscription();

// deal with failed payment
// set how many times we send notification to the client through the dashboard
// Manage payments that require confirmation

async function handleNotifyingCustomersOnFailedPayment(
  paymentFailureReason,
  customerEmail
) {
  try {
    //Retrive subcriber from aweber so we can get the previous custom field and add our modification
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const subcribers = await getSubscribers();

    //console.log(subcribers);

    const [subcriber] = subcribers.filter((subcriber) => {
      return subcriber.email === "jonathankendrick697@gmail.com";
    });

    //get custom field from the subscriber
    const previousCustomField = subcriber.custom_fields;

    const body = JSON.stringify({
      custom_fields: {
        ...previousCustomField,
        payment_failure_reason: paymentFailureReason,
      },
      tags: {
        add: ["payment failed"],
        //remove: ["payment failed", "worked"],
      },
    });

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers?subscriber_email=jonathankendrick697@gmail.com`;
    fetch(url, { headers: headers, method: "PATCH", body: body })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err);
  }
}
/* ========><======= */

export {
  handleAddingNewSubscribersToAweber,
  handleNotifyingSubscribersOnUpcomingPayment,
  handleNotifyingCustomersOnFailedPayment,
  handleNotifyingCustomerOnSucceededPayment,
  handleNotifyingCustomersOnCanceledSubscription,
};
