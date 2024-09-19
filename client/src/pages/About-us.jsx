import SecondaryHeroSection from "../components/SecondaryHeroSection";
import MeetUs from "../components/MeetUs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHeroSection pageName="about-us">
        <div className="hero_content about-us">
          <h1 className="hero_content-header">GET TO KNOW US</h1>
          <h1 className="hero_content-big">
            DMSL, Where <span>Creativity </span>Meets Technology
          </h1>
          <p>
            We are your strategic partner in navigating the ever-evolving
            digital world. Our methods are largely data-driven, using insights
            gained, we leverage cutting-edge AI to craft digital solutions that
            make real positive impact,whether it's crafting compelling content,
            managing effective social media campaigns, or optimizing email
            marketing, we help you connect with your target audience and support
            you in achieving your business goals, with experience spanning
            successful projects across the globe, we are your trusted guide to
            achieving digital excellence, targeted exposure and quality results.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745308/DMSL-BETA/about-us-hero-img_lqoiuh.png"
            alt="a business woman img"
          />
        </div>
      </SecondaryHeroSection>

      <MeetUs />
    </>
  );
}
