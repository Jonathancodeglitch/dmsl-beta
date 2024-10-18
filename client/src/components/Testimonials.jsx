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
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1727968095/DMSL-BETA/testimonial-video-1_lkk5kz.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="client-info">
            <img
              className="profile"
              src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1727992124/DMSL-BETA/kids_interiors_iithip.png"
            />
            <div className="col">
              <div className="client-name">Madina King</div>
              <div className="business-name">MK Kids Interiors</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="testimonial">
            <video controls>
              <source
                src="https://res.cloudinary.com/dv6uz0bks/video/upload/v1727985083/DMSL-BETA/testimonial-video-2_1_dangmw.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          <div className="client-info">
            <img
              className="profile"
              src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1727992124/DMSL-BETA/print_haven_img_sbvawh.png"
            />
            <div className="col">
              <div className="client-name">Dr. Femi Adekoya</div>
              <div className="business-name">The Print Haven By KFA</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="testimonial">
            <div className="card__testimonial-text">
              <FontAwesomeIcon icon={faQuoteLeft} />
              <p>
                “We needed to promote a new service.It was a challenge to
                effectively attract takers for this new product/service..With
                your help, we were able to reach a broader audience and reach
                our goals”
              </p>
            </div>
          </div>
          <div className="client-info">
            <img
              className="profile"
              src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1727992124/DMSL-BETA/eloquent_event_t2uoee.jpg"
            />
            <div className="col">
              <div className="client-name">Dupe Awosika</div>
              <div className="business-name">Eloquent Events Management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
