import Header from "../components/Header";
import Footer from "../components/Footer";
import Projects from "../components/FeaturedProject";
import SecondaryHeroSection from "../components/SecondaryHeroSection";
import Plan from "../components/Plan";

export default function ProjectPage() {
  let heroBigText = (
    <>
      Your Success Story Begins With <span>DMSL</span>
    </>
  );
  return (
    <>
      <SecondaryHeroSection
        heroIntro="FEATURED PROJECTS"
        heroBigText={heroBigText}
        heroDesc="Supporting the dreams and aspirations of our clients lies at the foundation of the services we provide. We go to great lengths to understand your needs, do our utmost to address them and leave you with a smile and more money in your pocket…. That’s our aim…! Thank you for choosing us to support you on your journey"
        heroImg="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745356/DMSL-BETA/project-hero-img_dcp0zz.png"
        name="project-hero"
      />
      <Projects home={false} />
      <Plan />
    </>
  );
}
