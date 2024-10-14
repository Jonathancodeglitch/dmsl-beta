import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function Benefits() {
  // Create refs for the sections you want to scroll to
  const servicesRef = useRef(null);
  // Get the current location (to detect hash changes)
  const location = useLocation();
  // Handle routing and scrolling to the section
  useEffect(() => {
    const hash = location.hash;
    // Check the hash and scroll to the corresponding section
    if (hash === "#services" && servicesRef.current) {
      servicesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [location]); // Trigger the effect whenever the location changes

  return (
    <section className="benefits container" ref={servicesRef}>
      <h1 className="benefits-title">Our Solutions</h1>
      <div className="benefits-card-container">
        <div className="card">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1728882982/digitalservice-img-min_pggsx5.png"
            alt="tech image"
          />
          <h3>Digital Services Consultancy</h3>
          <p>
            Digital services consultancy ( including but not limited to website
            design, creation, management, hosting services; digital marketing
            services) that aid the growth of your business revenue and profits
          </p>
        </div>
        <div className="card">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1728882982/mediaproduct-img-min_wkkaut.png"
            alt="tech image"
          />
          <h3>Digital and Media Products</h3>
          <p>
            Digital media solutions that improve your bottom line (including
            videos, graphics design, mobile & web apps)
          </p>
        </div>
        <div className="card">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1728882981/copywrite-img-min_pqmi8f.png"
            alt="tech image"
          />
          <h3>Copy Writing and Content Creation Services</h3>
          <p>
            Copy writing and content creation services that warm hearts and
            drive your prospects to open their wallets and keep buying and
            buying
          </p>
        </div>
      </div>
    </section>
  );
}
