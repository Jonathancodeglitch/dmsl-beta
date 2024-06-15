import testimonial from "../video/testimonial.mp4";

export default function Testimonial() {
  return (
    <div className="testimonials container">
      <h3 className="testimonial_title">TESTIMONIAL</h3>
      <h2 className="testimonial_subtitle">Client Feedback & Reviews</h2>
      <div className="row">
        <div className="card">
          <div className="testimonial_video">
            <video controls>
              <source src={testimonial} type="video/mp4" />
              <source src={testimonial} type="video/ogg" />
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
          <div className="testimonial_video">
            <video controls>
              <source src={testimonial} type="video/mp4" />
              <source src={testimonial} type="video/ogg" />
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
          <div className="testimonial_video">
            <video controls>
              <source src={testimonial} type="video/mp4" />
              <source src={testimonial} type="video/ogg" />
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
          <div className="testimonial_video">
            <video controls>
              <source src={testimonial} type="video/mp4" />
              <source src={testimonial} type="video/ogg" />
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
