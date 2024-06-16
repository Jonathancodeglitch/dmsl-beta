import jayeImage from "../img/jaye-img.png";
import bookYard from "../img/bookyard-img.png";
import townSend from "../img/townsend-img.png";

export default function FeaturedProject() {
  return (
    <section className="featured-project">
      <div className="container">
        <h1 className="featured-project_title">Other Featured Projects</h1>
        <div className="feature-project_cards">
          <div className="card">
            <div className="category">BRANDING</div>
            <div className="company-name">Jaye Foods</div>
            <img
              className="product-image"
              src={jayeImage}
              alt="product image"
            />
            <div className="row">
              <p>
                Client
                <span>Ajaye Crowther</span>
              </p>
              <p>
                Date
                <span>03-Jun-23</span>
              </p>
            </div>
            <div className="row">
              <p>
                Location
                <span>Nigeria</span>
              </p>
              <p>
                Budget
                <span>$12,000</span>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="category">DIGITAL MARKETING </div>
            <div className="company-name">Book Yard Podcast</div>
            <img className="product-image" src={bookYard} alt="product image" />
            <div className="row">
              <p>
                Client
                <span>AT Sonola</span>
              </p>
              <p>
                Date
                <span>12–May-23</span>
              </p>
            </div>
            <div className="row">
              <p>
                Location
                <span>United Kingdom</span>
              </p>
              <p>
                Budget
                <span>$5,000</span>
              </p>
            </div>
          </div>
          <div className="card">
            <div className="category">DIGITAL STRATEGY</div>
            <div className="company-name">Townsend Rail</div>
            <img className="product-image" src={townSend} alt="product image" />
            <div className="row">
              <p>
                Client
                <span>Ajaye Crowther</span>
              </p>
              <p>
                Date
                <span>03-Jun-23</span>
              </p>
            </div>
            <div className="row">
              <p>
                Location
                <span>Nigeria</span>
              </p>
              <p>
                Budget
                <span>$12,000</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
