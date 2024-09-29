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
    const response = await fetch(url, { headers: headers });
    const data = await response.json();
    return data.entries;
  } catch (err) {
    console.log(`an error occur while getting all subscribers ${err}`);
  }
}

//get a particular subscriber
async function getSubscriber(subcriberEmail) {
  try {
    const subcribers = await getSubscribers();
    //find the subscriber that needs an update
    const [subcriber] = subcribers.filter((subcriber) => {
      return subcriber.email === subcriberEmail;
    });

    return subcriber;
  } catch (err) {
    console.log(`an error while trying to get a subscriber ${err}`);
  }
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
    const response = await fetch(url, {
      headers: headers,
      method: "PATCH",
      body: body,
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(`an error occur while trying to update a subscriber ${err}`);
  }
}

//handle adding new subscribers to aweber
async function handleAddingNewSubscribersToAweber(subscriptionInfo) {
  try {
    const subscribers = await getSubscribers();
    const hasSubscriber = subscribers.some((subscriber) => {
      return subscriber.email === subscriptionInfo.customerEmail;
    });

    //check if subscriber already exist
    if (!hasSubscriber) {
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
      const response = await fetch(url, {
        headers: headers,
        method: "POST",
        body: body,
      });

      console.log(response);
      console.log("adding new subscriber");
    } else {
      console.log(
        "the subscrber already exist and we have sent them a welcome mail"
      );
    }
  } catch (err) {
    console.log(`an err occured while adding a new subscriber ${err}`);
  }
}

//notify customers that their payment was a success
async function handleNotifyingCustomerOnSucceededPayment(subscriptionInfo) {
  const subcriber = await getSubscriber(subscriptionInfo.customerEmail);
  const previousCustomField = subcriber.custom_fields;
  const previousTags = subcriber.tags;

  //check if the subscriber already has a tag trigger
  if (previousTags.includes("payment succeeded")) {
    let requestBody = {
      tags: {
        remove: ["payment succeeded"],
      },
    };

    await modifySubscribers(requestBody, subscriptionInfo.customerEmail);
    console.log("tag was removed");
  }

  //add tag to trigger the email
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

  await modifySubscribers(requestBody, subscriptionInfo.customerEmail);
  console.log("tag was added");
}

//
async function addDmslTeamToAweber(requestBody) {
  try {
    const Token = await retriveAccessTokenFromDb();

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "AWeber-Node-code-sample/1.0",
      Authorization: `Bearer ${Token.access_token}`,
    };

    const body = JSON.stringify(requestBody);

    const url = `https://api.aweber.com/1.0/accounts/1225608/lists/6803252/subscribers`;
    const response = await fetch(url, {
      headers: headers,
      method: "POST",
      body: body,
    });

    console.log(response.status);
    console.log("added dmsl team to aweber");
  } catch (err) {
    console.log(
      `an error occured while trying to addDmslTeam to aweber ${err}`
    );
  }
}

//notify customers that their subscription has been cancelled
async function notifyDmslTeamOnWhySubscriptionWasCanceled(
  cancelSubscriberEmail,
  cancellationReason
) {
  try {
    const dmslTeamEmail = "kendrickjonathan900@gmail.com";
    const dmslTeam = await getSubscriber(dmslTeamEmail);
    const canceledSubscriber = await getSubscriber(cancelSubscriberEmail);
    const previousCustomField = canceledSubscriber.custom_fields;

    console.log(cancelSubscriberEmail, cancellationReason);
    let requestBody = {
      custom_fields: {
        ...previousCustomField,
        cancellation_comment: cancellationReason.comment,
        cancellation_feedback: cancellationReason.feedback,
        cancelled_subscriber_email: cancelSubscriberEmail,
      },
      email: dmslTeamEmail,
      name: "soji fagade",
      tags: {
        add: ["send_cancellation_reason"],
      },
    };

    //check if the subscriber dropped a feeedback!!
    if (cancellationReason.feedback !== null) {
      //Check if dmsl team is already on the emailList
      if (!dmslTeam) {
        await addDmslTeamToAweber(requestBody);
      } else {
        //update the dmsl by adding a trigger to the cancel reason message
        await modifySubscribers(requestBody, dmslTeamEmail);
        console.log("sending feedback");
      }
    } else {
      console.log("this user did not give a feedback about cancellation!!");
    }
  } catch (err) {
    console.log(
      `an error occurs while notifying dmsl team about subscriber cancellation ${err}`
    );
  }
}

async function handleNotifyingCustomersOnCanceledSubscription(
  subscriberEmail,
  cancellationReason
) {
  try {
    let requestBody = {
      tags: {
        add: ["cancel subscription"],
        remove: ["renewal subscription"],
      },
    };

    //send an email to dmsl team on why this subscription was cancelled
    await notifyDmslTeamOnWhySubscriptionWasCanceled(
      subscriberEmail,
      cancellationReason
    );

    //add trigger tag to send cancel notification
    await modifySubscribers(requestBody, subscriberEmail);
    console.log("subscription has been canceled");
  } catch (err) {
    console.log(
      `error while notifying customer about their cancellation ${err}`
    );
  }
}

//notify customers that their subscription has been renewed and would not be canceled
async function handleNotifyingCustomersOnRenewedSubscription(subscriberEmail) {
  try {
    const subcriber = await getSubscriber(subscriberEmail);
    const subcriberPreviousTags = subcriber.tags;

    //check if subscription was previously canceled
    if (subcriberPreviousTags.includes("cancel subscription")) {
      //Check if the subscriber already have a trigger tag and remove it
      let requestBody = {
        tags: {
          add: ["renewal subscription"],
          remove: ["cancel subscription"],
        },
      };
      // Add the tag trigger to send an email to the subscriber
      await modifySubscribers(requestBody, subscriberEmail);
      console.log("renewal tag added");
    }
  } catch (err) {
    console.log(
      `error occured while notifying customer about them renewing their plan ${err}`
    );
  }
}

// deal with failed payment
// set how many times we send notification to the client through the dashboard
// Manage payments that require confirmation
async function handleNotifyingCustomersOnFailedPayment(
  paymentFailureReason,
  customerEmail
) {
  const subcriber = await getSubscriber(customerEmail);
  //get custom field from the subscriber
  const subcriberPreviousCustomField = subcriber.custom_fields;

  const requestBody = {
    custom_fields: {
      ...subcriberPreviousCustomField,
      payment_failure_reason: paymentFailureReason
        ? `PAYMENT FAILURE REASON: ${paymentFailureReason}`
        : "",
    },
    tags: {
      add: ["payment failed"],
    },
  };

  //add trigger
  await modifySubscribers(requestBody, customerEmail);
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
