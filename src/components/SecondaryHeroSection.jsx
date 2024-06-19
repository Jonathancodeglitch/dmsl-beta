import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";


export default function SecondaryHeroSection({
  heroIntro,
  heroBigText,
  heroDesc,
  heroImg,
  name,
}) {
  return (
    <section className={`hero secondary-hero ${name}`}>
      <div className="container secondary-container">
        <div className="hero_content">
          <h1 className="hero_content-header">{heroIntro}</h1>
          <h1 className="hero_content-big">{heroBigText}</h1>
          <p>{heroDesc}</p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
          <img
            className="secondary-hero_img"
            src={heroImg}
            alt="a business woman img"
          />
        </div>
      </div>
    </section>
  );
}
