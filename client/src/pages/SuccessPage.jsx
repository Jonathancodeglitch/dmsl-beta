import "../css/success.css";
import Lottie from "react-lottie";
import animationData from "../Lotties/succuss.json";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  //fetch the details of the payment
  return (
    <div className="success-page">
      <div className="success-page__content">
        <SuccessAnimation />
        <h1 className="success-page__title">
          Thank You for Your Subscription!
        </h1>
        <div className="success-page__desc description">
          <p>
            We’re thrilled to have you onboard. Your subscription was
            successful, and our team is eager to help you get started, you’ll
            receive an email from us shortly with all the details you need.
          </p>
          <p>
            If you have any questions in the meantime, feel free to reach out to
            us at{" "}
            <span className="success-page__desc--contact">
              hello@digitalandmediaservices.com
            </span>
          </p>

          <p>
            Thank you for trusting us, and we look forward to working with you!
          </p>
        </div>

        <Link to="/" className="btn success-page__btn">
          Continue
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
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}
