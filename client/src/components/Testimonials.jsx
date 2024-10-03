import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Testimonial() {
  return (
    <div className="testimonials container">
      <h3 className="testimonial_title">TESTIMONIAL</h3>
      <h2 className="testimonial_subtitle">Client Feedback & Reviews</h2>
      <div className="row">
        <div className="card">
          <div className="testimonial">
            <video controls>
              <source
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1719747233/DMSL-BETA/bookyard-video_uj8ck1.mp4"
                type="video/mp4"
              />
              <source
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1719747233/DMSL-BETA/bookyard-video_uj8ck1.mp4"
                type="video/ogg"
              />
            </video>
          </div>
          <div className="client-info">
            <div className="profile"></div>
            <div className="col">
              <div className="client-name">Client Name</div>
              <div className="business-name">Business name</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="testimonial">
            <div className="card__testimonial-text">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                nobis minus debitis, labore repellendus aliquid iusto atque,
                ipsum sint, vitae dolor corrupti at consequatur temporibus odio.
                Et tempore eveniet incidunt.
              </p>
            </div>
          </div>
          <div className="client-info">
            <div className="profile"></div>
            <div className="col">
              <div className="client-name">Client Name</div>
              <div className="business-name">Business name</div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="testimonial">
            <video controls>
              <source
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1719747233/DMSL-BETA/bookyard-video_uj8ck1.mp4"
                type="video/mp4"
              />
              <source
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1719747233/DMSL-BETA/bookyard-video_uj8ck1.mp4"
                type="video/ogg"
              />
            </video>
          </div>
          <div className="client-info">
            <div className="profile"></div>
            <div className="col">
              <div className="client-name">Client Name</div>
              <div className="business-name">Business name</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
