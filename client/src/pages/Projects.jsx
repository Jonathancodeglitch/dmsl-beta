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
            Let <span>Us</span> Elevate Your Brand Together
          </h1>
          <p>
            We’ve worked on a variety of projects that showcase our digital and
            marketing expertise. From content creation, to website design and
            social media management.
            <br />
            See how we've helped businesses like yours achieve their digital
            goals.
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
