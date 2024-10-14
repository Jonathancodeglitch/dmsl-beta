import SecondaryHeroSection from "../components/SecondaryHeroSection";
import MeetUs from "../components/MeetUs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHeroSection pageName="about-us">
        <div className="hero_content about-us">
          <h1 className="hero_content-header">Who we are</h1>
          <h1 className="hero_content-big">
            DMSL: Maximizing <span>Creativity </span> and technology
          </h1>
          <p>
            We can help you achieve your business goals with data-driven digital
            solutions.
            <br />
            Be it creating authentic engaging content and managing social media
            or optimizing email marketing, we can help you find and connect with
            your target audience to serve them.
            <br />
            Our experience and successful projects speak for us.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            loading="lazy"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745308/DMSL-BETA/about-us-hero-img_lqoiuh.png"
            alt="a business woman img"
          />
        </div>
      </SecondaryHeroSection>

      <MeetUs />
    </>
  );
}
