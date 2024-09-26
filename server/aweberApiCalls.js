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

//get a particular subscriber
async function getSubscriber(subcriberEmail) {
  const subcribers = await getSubscribers();
  //find the subscriber that needs an update
  const [subcriber] = subcribers.filter((subcriber) => {
    return subcriber.email === subcriberEmail;
  });

  return subcriber;
}

// update a subscriber
async function modifySubscribers(requestBody, email) {
  try {
    //Retrive subcriber from aweber so we can get the previous custom field and add our modification
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const body = JSON.stringify(requestBody);

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
  //check if subscriber already exist
  const subscribers = await getSubscribers();
  const hasSubscriber = subscribers.some((subscriber) => {
    return subscriber.email === subscriptionInfo.customerEmail;
  });

  if (!hasSubscriber) {
    try {
      console.log("adding subscriber");
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
        email:
          subscriptionInfo.customerEmail || "jonathankendrick697@gmail.com",
        name: subscriptionInfo.customerName || "fefefe",
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
  } else {
    console.log(
      "the subscrber already exist and we have sent them a welcome mail"
    );
  }
}

//notify customers that their payment was a success
async function handleNotifyingCustomerOnSucceededPayment(subscriptionInfo) {
  const subcriber = await getSubscriber(subscriptionInfo.customerEmail);
  const previousCustomField = subcriber.custom_fields;
  const previousTags = subcriber.tags;

  let requestBody = {
    custom_fields: {
      ...previousCustomField,
      product_renewal_date: subscriptionInfo.productRenewalDate,
      product_billing_date: subscriptionInfo.productBillingDate,
    },
    tags: {
      add: ["payment succeeded"],
    },
  };

  //check if the subscriber already has a tag trigger
  if (previousTags.includes("payment succeeded")) {
    requestBody = {
      tags: {
        remove: ["payment succeeded"],
      },
    };
    await modifySubscribers(requestBody, subscriptionInfo.customerEmail);
    console.log("remove tag");
  }

  //add tag to trigger the email
  await modifySubscribers(requestBody, subscriptionInfo.customerEmail);
  console.log("add tag");

  //remove previous trigger tag from subscriber
}

//notify customers that their subscription has been cancelled
async function handleNotifyingCustomersOnCanceledSubscription(subscriberEmail) {
  const subcriber = await getSubscriber(subscriberEmail);
  const subcriberPreviousTags = subcriber.tags;

  let requestBody = {
    tags: {
      add: ["cancel subscription"],
    },
  };
  //check if this subscriber already has the trigger tag
  if (subcriberPreviousTags.includes("cancel subscription")) {
    requestBody = {
      tags: {
        remove: ["cancel subscription"],
      },
    };
    //remove trigger tag before re-applying
    await modifySubscribers(requestBody, subscriberEmail);
  }

  //add trigger tag to send cancel notification
  await modifySubscribers(requestBody, subscriberEmail);
}

//notify customers that their subscription has been renewed and would not be canceled
async function handleNotifyingCustomersOnRenewedSubscription(subscriberEmail) {
  const subcriber = await getSubscriber(subscriberEmail);
  const subcriberPreviousTags = subcriber.tags;

  let requestBody = {
    tags: {
      add: ["renew subscription"],
      remove: ["cancel subscription"],
    },
  };

  //check if subscription was previously canceled
  if (subcriberPreviousTags.includes("cancel subscription")) {
    //check if the subscriber already have a trigger tag and remove it
    if (subcriberPreviousTags.includes("renew subscription")) {
      requestBody = {
        tags: {
          remove: ["cancel subscription", "renew subscription"],
        },
      };
      await modifySubscribers(requestBody, subscriberEmail);
      console.log("renewal removed!!");
    }
    // add the tag trigger to send an email to the subscriber
    await modifySubscribers(requestBody, subscriberEmail);
    console.log("renewal tag added");
  }
}

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

//remeber to schedule when the notification is made on the dashboard
async function handleNotifyingSubscribersOnUpcomingPayment(subscriber) {
  //  get all subscribers from my emailList
  const Token = await retriveAccessTokenFromDb();

  try {
    console.log("adding payments");
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
/* ========><======= */

export {
  handleAddingNewSubscribersToAweber,
  handleNotifyingSubscribersOnUpcomingPayment,
  handleNotifyingCustomersOnFailedPayment,
  handleNotifyingCustomerOnSucceededPayment,
  handleNotifyingCustomersOnCanceledSubscription,
  handleNotifyingCustomersOnRenewedSubscription,
};
