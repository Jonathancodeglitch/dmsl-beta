import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";
import mobile from "../img/mobile.png";

function HeroContentSecondary() {
  return (
    <div className="hero_content-secondary">
      <h1 className="hero_content-secondary-title">SUCCESS PROJECT</h1>
      <p>
        We recently designed and developed a cloud-based mobile app for
        BetaTravel agency. BetaTravel agency has greatly improved customer base
        since its launch.
      </p>
      <div className="hero-mobile-img">
        <img src={mobile} alt="mobile devices" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container secondary-container">
        <div className="hero_content">
          <h1 className="hero_content-header">
            Digital and Media Services Limited
          </h1>
          <h1 className="hero_content-big">
            Scale your business With our complete <span>Digital</span> Program
          </h1>
          <p>
            Apply effective and proven ways used by top industry to further
            improve the accessibility of your trade and generate income.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
        </div>
        {/* hero content secondary */}
        <HeroContentSecondary />
      </div>
    </section>
  );
}
