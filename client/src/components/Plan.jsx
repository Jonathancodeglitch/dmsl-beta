import { useState, useEffect, useRef } from "react";
import packages from "../planPackages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
export default function Plan() {
  // Create refs for the sections you want to scroll to
  const planSectionRef = useRef(null);
  // Get the current location (to detect hash changes)
  const location = useLocation();
  // Handle routing and scrolling to the section
  useEffect(() => {
    const hash = location.hash;
    // Check the hash and scroll to the corresponding section
    if (hash === "#packages" && planSectionRef.current) {
      planSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]); // Trigger the effect whenever the location changes

  return (
    <section className="plan" ref={planSectionRef}>
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
        const response = await fetch("http://localhost:8000/getUserLocation");
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
        <FontAwesomeIcon icon={faCaretDown} /> {" " + serviceName + " "}
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
  const [cardClick, setCardClick] = useState(false);

  function handleClick(itemId) {
    setCardClick(true);
    //post a request to the server https://dmsl-beta-xrq6.vercel.app
    fetch("http://localhost:8000/create-checkout-session", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        id: itemId,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        //ELSE
        return res.json().then((json) => {
          Promise.reject(json);
        });
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }

  return (
    <button
      onClick={() => {
        handleClick(id);
      }}
      className="btn"
    >
      {!cardClick ? (
        "SELECT PACKAGE"
      ) : (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
      )}
    </button>
  );
}

//display success message if offers was successfully payed for!!
