import { useState, useEffect } from "react";
import packages from "../planPackages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Plan() {
  return (
    <section className="plan">
      <div className="container row">
        <div className="plan-content">
          <h4>CHOOSE YOUR PLAN</h4>
          <h1>Packages priced to suit your business</h1>
          <ul className="plan-year">
            <li>2022</li>
            <li className="">2023</li>
            <li className="active">2024</li>
          </ul>
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
          console.log(data.location);
          console.log(data.ip);
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
    fetch("https://dmsl-beta-xrq6.vercel.app/create-checkout-session", {
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
