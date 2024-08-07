// fix issue with button on producion
// try implementing a better design that suits the content
// add interactivity
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faEye } from "@fortawesome/free-solid-svg-icons";

const packages = [
  {
    id: 0,
    packageName: "Starter Package",
    desc: "Best for new/small businesses",
    amount: "£500",
    services: [
      {
        name: "Social Media Management",
        list: [
          "10 posts per month across 2 platforms (Facebook and LinkedIn/Instagram)",
          "Basic engagement (replying to comments and messages)",
          "Sponsored ads (At your discretion)",
        ],
      },
      {
        name: "Longform Content Creation",
        list: ["2 blog posts per month (500 words each)"],
      },
      {
        name: "Email Marketing",
        list: ["1 email/Newsletter campaign per month"],
      },
      {
        name: "Search Engine Optimisation (SEO):",
        list: ["Basic web page and social media page SEO"],
      },
      {
        name: "Monthly Reporting:",
        list: ["Basic performance report across all platforms."],
      },
    ],
  },
  {
    id: 1,
    packageName: "Standard Package",
    desc: "Best for established/stable businesses",
    amount: "£1000",
    services: [
      {
        name: "Social Media Management",
        list: [
          "20 posts per month across 3 platforms - with Content Calendar Built",
          "Enhanced engagement and community management",
        ],
      },
      {
        name: "Content Creation:",
        list: [
          "4 blog posts per month (700 words each)",
          "2 infographics or custom graphics per month",
        ],
      },
      {
        name: "Email Marketing",
        list: ["2 email campaigns per month", "A/B testing and segmentation"],
      },
      {
        name: "Search Engine Optimisation (SEO):",
        list: [
          "Advanced on-page SEO for up to 10 pages",
          "5 keyword tracking and optimization",
        ],
      },
      {
        name: "Pay-Per-Click (PPC) Advertising:",
        list: [
          "Monthly budget management (up to £500 ad spend)",
          "Campaign setup and monitoring",
        ],
      },
      {
        name: "Monthly Reporting:",
        list: ["Detailed performance report with insights and recommendations"],
      },
    ],
  },
  {
    id: 2,
    packageName: "Premium Package",
    desc: "Best for SME's",
    amount: "£2000",
    services: [
      {
        name: "Social Media Management: ",
        list: [
          "30 posts per month across 4 platforms",
          "Advanced engagement, community management, and growth strategies",
        ],
      },
      {
        name: "Content Creation:",
        list: [
          "6 blog posts per month (1,000 words each)",
          "4 infographics or custom graphics per month",
          "2 videos per month (short-form)",
        ],
      },
      {
        name: "Email Marketing",
        list: [
          "4 email campaigns per month",
          "Comprehensive A/B testing, segmentation, and automation",
        ],
      },
      {
        name: "Search Engine Optimisation (SEO):",
        list: [
          "Comprehensive on-page SEO for up to 20 pages",
          "10 keyword tracking and optimizatio",
          "Link building and outreach",
        ],
      },
      {
        name: "Pay-Per-Click (PPC) Advertising:",
        list: [
          "Monthly budget management (up to £1,000 ad spend)",
          "Campaign setup, monitoring, and optimization",
        ],
      },
      {
        name: "Website Management:",
        list: ["Monthly updates and maintenance", "Performance optimization"],
      },
      {
        name: "Monthly Reporting:",
        list: [
          "In-depth performance report with actionable insights and quarterly strategy meetings",
        ],
      },
    ],
  },
];

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
  return (
    <div className="plan-cards">
      {packages.map((packages) => {
        return (
          <Card
            key={packages.id}
            packageName={packages.packageName}
            description={packages.desc}
            packageAmount={packages.amount}
            services={packages.services}
          />
        );
      })}
    </div>
  );
}

function Card({ packageName, description, packageAmount, services }) {
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
      <button className="btn">SELECT PACKAGE</button>
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
