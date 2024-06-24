import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ywiitBannner from "../img/ywiit-banner.png";
import NextProjectImg from "../img/next-project-img.png";

export default function ProjectOverview() {
  return (
    <section className="project-overview">
      <div className="overview-hero">
        <div className="container row">
          <div className="project-name">YWIIT</div>
          <FontAwesomeIcon className="dropdown-icon" icon={faCaretDown} />
        </div>
      </div>
      {/* about project */}
      <div className="about-project">
        <div className="container">
          {/* project details starts */}
          <div className="about-project_content">
            <div className="left">
              <h1>About Project</h1>
              <p>
                Short description about the project goes here, we created a
                number of event flyers, banners and social media posts. Also
                developed their website
              </p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <span>Project type:</span>
                  <span>Digital Strategy</span>
                </li>
                <li>
                  <span>For company:</span>
                  <span> YWIIT</span>
                </li>
                <li>
                  <span>Time estimation:</span>
                  <span>2 months</span>
                </li>
              </ul>
            </div>
          </div>
          {/* project details ends */}
          {/* project gallery*/}
          <div className="project-gallery">
            <div className="project-img">
              <img src={ywiitBannner} alt="a photo of women in tech" />
            </div>
            <div className="project-img">
              <img src={ywiitBannner} alt="a photo of women in tech" />
            </div>
            <div className="project-img">
              <img src={ywiitBannner} alt="a photo of women in tech" />
            </div>
          </div>
          {/* project gallery ends*/}
          <div className="enquiry">
            <h1>What’s Next?</h1>
            <p>
              Short text goes here, something that will work with the call to
              action.Short text goes here, something that will work with the
              call to action. Short text goes here, something that will work
              with the call to action.
            </p>
            <a className="enquiry-btn">Let’s Work Together!</a>
          </div>
        </div>
      </div>
      <NextProject />
    </section>
  );
}

function NextProject() {
  return (
    <div className="next-project">
      <div
        className="next-project_img"
        style={{ backgroundImage: `url(${NextProjectImg})` }}
      >
        <div className="project-details">
          <div className="project-name">Book Yard Podcast</div>
          <div className="client-name">Client name</div>
        </div>
      </div>
      <div className="next-project_button">
        <FontAwesomeIcon
          className="next-project_button_icon"
          icon={faArrowRightLong}
        />
      </div>
    </div>
  );
}
