import ContactUs from "../components/ContactUs";
import SecondaryHeroSection from "../components/SecondaryHeroSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function ContactUsPage() {
  return (
    <>
      <SecondaryHeroSection pageName="contact-us-hero">
        <div className="hero_content project-hero">
          <h1 className="hero_content-header">TELL US EVERYTHING</h1>
          <h1 className="hero_content-big">
            Experience the Magic Of <span>DMSL</span>
          </h1>
          <p>
            Questions? Comments? Concerns? We are here for your everyday Digital
            needs. Send us a message, We’d love to hear from you.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745313/DMSL-BETA/businesswoman-img_ognyly.png"
            alt="a business woman img"
          />
        </div>
      </SecondaryHeroSection>
      <ContactUs />
    </>
  );
}

{
  /*
<SecondaryHeroSection
heroIntro=""
heroBigText={heroBigText}
heroDesc="Questions? Comments? Concerns? We are here for your everyday Digital needs. Send us a message, We’d love to hear from you"
heroImg="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745313/DMSL-BETA/businesswoman-img_ognyly.png"
name=""
/> 
*/
}
