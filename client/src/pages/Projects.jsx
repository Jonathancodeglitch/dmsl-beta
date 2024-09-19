import Projects from "../components/FeaturedProject";
import SecondaryHeroSection from "../components/SecondaryHeroSection";
import Plan from "../components/Plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function ProjectPage() {
  return (
    <>
      <SecondaryHeroSection pageName="project-hero">
        <div className="hero_content project-hero">
          <h1 className="hero_content-header">FEATURED PROJECTS</h1>
          <h1 className="hero_content-big">
            Your Success Story Begins With <span>DMSL</span>
          </h1>
          <p>
            Supporting the dreams and aspirations of our clients lies at the
            foundation of the services we provide. We go to great lengths to
            understand your needs, do our utmost to address them and leave you
            with a smile and more money in your pocket…. That’s our aim…! Thank
            you for choosing us to support you on your journey.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745356/DMSL-BETA/project-hero-img_dcp0zz.png"
            alt="a business woman img"
          />
        </div>
      </SecondaryHeroSection>
      <Projects home={false} />
      <Plan />
    </>
  );
}
