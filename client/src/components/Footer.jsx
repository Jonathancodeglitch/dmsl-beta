import Logo from "../img/logo-white.svg";
import twitter from "../img/twitter.svg";
import instagram from "../img/instagram.svg";
import linkedin from "../img/linkedin.svg";

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
              <img
                src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745378/DMSL-BETA/twitter_rp9tgu.svg"
                alt="twitter"
              />
              <img
                src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745313/DMSL-BETA/instagram_axsel9.svg"
                alt="twitter"
              />
              <img
                src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745323/DMSL-BETA/linkedin_gzaozh.svg"
                alt="twitter"
              />
            </div>
          </div>
          <ul className="footer-links">
            <li className="title">SERVICES</li>
            <li>Digital services consultancy</li>
            <li>Digital and Media products</li>
            <li>Copy Writing and Content Creation Services</li>
          </ul>
          <ul className="footer-links">
            <li className="title">SUPPORT</li>
            <li>Help center</li>
            <li>FAQ</li>
          </ul>
          <ul className="footer-links">
            <li className="title">DMSL</li>
            <li>About Us</li>
            <li>Projects</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <p className="copyright">Copyright &copy; Developed by DMSL</p>
      </div>
    </section>
  );
}
