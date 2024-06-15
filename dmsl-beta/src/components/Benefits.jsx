import digitalserviceImg from "../img/digitalservice-img.png";
import copywriteImg from "../img/copywrite-img.png";
import mediaProductImageImg from "../img/mediaproduct-img.png";

export default function Benefits() {
  return (
    <section className="benefits container">
      <h1 className="benefits-title">What You Get From Us</h1>
      <div className="benefits-card-container">
        <div className="card">
          <img src={digitalserviceImg} alt="tech image" />
          <h3>Digital Services Consultancy</h3>
          <p>
            Digital services consultancy ( including but not limited to website
            design, creation, management, hosting services; digital marketing
            services) that aid the growth of your business revenue and profits
          </p>
        </div>
        <div className="card">
          <img src={mediaProductImageImg} alt="tech image" />
          <h3>Digital and Media Products</h3>
          <p>
            Digital media solutions that improve your bottom line (including
            videos, graphics design, mobile & web apps)
          </p>
        </div>
        <div className="card">
          <img src={copywriteImg} alt="tech image" />
          <h3>Copy Writing and Content Creation Services</h3>
          <p>
            Copy writing and content creation services that warm hearts and
            drive your prospects to open their wallets and keep buying and
            buying
          </p>
        </div>
      </div>
    </section>
  );
}
