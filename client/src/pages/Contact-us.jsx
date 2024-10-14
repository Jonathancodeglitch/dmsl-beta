import ContactUs from "../components/ContactUs";
import SecondaryHeroSection from "../components/SecondaryHeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function ContactUsPage() {
  return (
    <>
      <SecondaryHeroSection pageName="contact-us-hero">
        <div className="hero_content project-hero">
          <h1 className="hero_content-header">TALK TO US</h1>
          <h1 className="hero_content-big">
            How Can We Serve <span>You </span>Today?
          </h1>
          <p>
            Got questions? Comments? Concerns? Send us a message.
            <br /> We’d love to hear from you!
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            loading="lazy"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745313/DMSL-BETA/businesswoman-img_ognyly.png"
            alt="a business woman img"
          />
        </div>
      </SecondaryHeroSection>
      <ContactUs />
    </>
  );
}


