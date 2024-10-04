import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="footer-logo">
          <img
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745335/DMSL-BETA/logo-white_lddtkw.svg"
            alt="logo"
          />
        </div>
        <div className="row">
          <div className="footer_contact-us">
            <p>
              Transforming ideas into Digital Excellence. Elevate your online
              presence with our Innovativesolutions and strategic digital
              services.
            </p>
            <div className="footer-social-icon">
              <a href="https://x.com/digitalandmedi1">
                <FontAwesomeIcon icon={faTwitter} beat />
              </a>
              <a
                href="https://www.instagram.com/digitalandmediaservices/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} beat />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100063786091313"
                target="_blank"
              >
                <FontAwesomeIcon icon={faSquareFacebook} beat />
              </a>
            </div>
          </div>
          <ul className="footer-links">
            <li className="title">SERVICES</li>
            <li>Digital services consultancy</li>
            <li>Digital and Media products</li>
            <li>Copy Writing and Content Creation Services</li>
          </ul>
          {/*  <ul className="footer-links">
            <li className="title">SUPPORT</li>
            <li>Help center</li>
            <li>FAQ</li>
          </ul> */}
        </div>
        <p className="copyright">Copyright &copy; Developed by DMSL</p>
      </div>
    </section>
  );
}
