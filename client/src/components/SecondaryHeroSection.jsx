import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiamond } from "@fortawesome/free-solid-svg-icons";

export default function SecondaryHeroSection({ children, pageName }) {
  return (
    <section className={`hero secondary-hero ${pageName ? pageName : ""}`}>
      <div className="container secondary-container">{children}</div>
    </section>
  );
}
