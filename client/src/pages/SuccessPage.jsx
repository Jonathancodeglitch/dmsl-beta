import "../css/success.css";
import Lottie from "react-lottie";
import animationData from "../Lotties/succuss.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  //fetch the details of the payment
  return (
    <div className="success-page">
      <div className="success-page__content">
        <SuccessAnimation />
        <h1 className="success-page__title title">
          Thank You for Your Purchase!
        </h1>
        <p className="success-page__desc description">
          We're thrilled to have you as a customer. Your order was successful
          and a member of our team will be in touch with you shortly to get you
          started.
        </p>

        <div className="success-page__next">
          <h3 className="success-page__next-title title">What's Next?</h3>
          <p className="success-page__next-desc description">
            <span className="sm-title">Confirmation Email:</span> Check your
            inbox for a confirmation email with all the details of your order.
          </p>
        </div>
        {/* support */}

        <p className="success-page__support-desc description">
          <span className="sm-title">Support: </span> If you have any questions,
          feel free to reach out to our support team at xxxx@emial.com or call
          us at xxx-xxx-xxx.
        </p>

        {/* socials */}
        <div className="success-page__socials">
          <p className="success-page__socials-desc description">
            <span className="sm-title"> Stay Connected: </span>Follow us on
            social media for the latest updates and exclusive offers.
          </p>
          <div className="success-page__socials-icons">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
          </div>
        </div>
        <p className="success-page__footer">
          Thank you for choosing us. We hope to see you again soon!
        </p>
        <Link to="/" className="btn success-page__btn">
          continue
        </Link>
      </div>
    </div>
  );
}

function SessionButton() {
  // Check to see if this is a redirect back from Checkout
  const query = new URLSearchParams(window.location.search);

  function handleClick() {
    if (query.get("success")) {
      fetch("http://localhost:8000/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: query.get("session_id") }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          console.log(data);
        })
        .catch((error) => {
          // Handle any errors
        });
    }
  }
  return <button onClick={handleClick}>click me</button>;
}

function SuccessAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={180} width={180} />
    </div>
  );
}
