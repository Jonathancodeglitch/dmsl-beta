import { useState, useEffect, useRef } from "react";
import packages from "../planPackages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Plan({ isPackagesPage = false }) {
  return (
    <section className={`plan ${isPackagesPage ? "packages_page" : ""}`}>
      <div className="container row">
        <div className="plan-content">
          <h4>CHOOSE YOUR PLAN</h4>
          <h1>Packages priced to suit your business</h1>
          <p>
            Our goal is to help you maximize value for you by starting from your
            challenges all the way to your goals.
          </p>
        </div>
        <PlanCards packages={packages} />
      </div>
    </section>
  );
}

function PlanCards({ packages }) {
  //get user location
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await fetch(
          "https://dmsl-beta-xrq6.vercel.app/getUserLocation"
        );
        if (response.ok) {
          const data = await response.json();
          setUserLocation(data.location);
        } else {
          console.error("Failed to fetch user location");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Automatically fetch IP address when the component loads
    fetchIpAddress();
  }, []);

  //display amount base on user location
  return (
    <div className="plan-cards">
      {packages.map((packages) => {
        return (
          <Card
            key={packages.id}
            id={packages.id}
            packageName={packages.packageName}
            description={packages.desc}
            packageAmount={
              userLocation === "NG" ? packages.amountNG : packages.amount
            }
            services={packages.services}
          />
        );
      })}
    </div>
  );
}

function Card({ packageName, description, packageAmount, services, id }) {
  return (
    <div className="card">
      <div className="card-title">{packageName}</div>
      <div className="card-desc">{description}</div>
      <div className="plan-amount">
        {packageAmount}
        <br />
        <span>Monthly</span>
      </div>
      {/* services */}
      <div className="service">
        <div className="service_list-label">Services Included:</div>

        {services.map((service, id) => {
          return (
            <ServiceListing
              key={id}
              serviceName={service.name}
              serviceListing={service.list}
            />
          );
        })}
      </div>
      <CheckOutButton id={id} />
    </div>
  );
}

function ServiceListing({ serviceName, serviceListing }) {
  const [serviceList, setServiceList] = useState(false);

  function handleServiceListClick() {
    setServiceList(!serviceList);
  }

  return (
    <div className="service_list">
      <h3 className="service_list-title" onClick={handleServiceListClick}>
        <FontAwesomeIcon icon={faCaretRight} /> {"  " + serviceName + " "}
      </h3>
      {serviceList && (
        <ul>
          {serviceListing.map((serviceListing, id) => {
            return <li key={id}>{serviceListing}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

function CheckOutButton({ id }) {
  const [loading, setLoading] = useState(false);

  async function handleClick(itemId) {
    try {
      // Post a request to the server
      setLoading(true);
      const res = await fetch(
        "https://dmsl-beta-xrq6.vercel.app/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: itemId,
          }),
        }
      );

      // Check if the response is OK
      if (res.ok) {
        const { url } = await res.json();
        //setIsSuccessful(true); // Set success state if the call was successful
        window.location = url; // Redirect to the URL
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
    } catch (e) {
      console.error("Error:", e.message);
      //setErrorMessage(e.message); // Set error message if the request fails
    } finally {
      // Stop loading when the request is completed, regardless of success or failure
      setLoading(false);
    }
  }

  return (
    <button
      onClick={() => {
        handleClick(id);
      }}
      className="btn"
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      ) : (
        "SELECT PACKAGE"
      )}
    </button>
  );
}
