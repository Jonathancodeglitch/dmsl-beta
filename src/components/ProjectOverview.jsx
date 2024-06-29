import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

import ywiitHero from "../img/ywiit.png";
import ywiitImg1 from "../img/ywiit-img-1.jpg";
import ywiitImg2 from "../img/ywiit-img-2.jpg";
import ywiitImg3 from "../img/ywiit-img-3.jpg";

import jayeHeroImg from "../img/Jaye-hero-img.jpg";
import jayeImg1 from "../img/jaye-img-1.jpg";
import jayeImg2 from "../img/jaye-img-2.jpg";
import jayeImg3 from "../img/jaye-img-3.jpg";
import jayeImg4 from "../img/jaye-img-4.png";

import sheaOriginHero from "../img/shea-origin-hero.png";
import sheaOriginImg1 from "../img/shea-origin-img-1.png";
import sheaOriginImg2 from "../img/shea-origin-img-2.jpg";
import sheaOriginImg3 from "../img/shea-origin-img-3.jpg";

import bookYardHeroImg from "../img/bookyard-hero.png";
import bookYardImg1 from "../img/bookyard-img-1.jpg";
import bookYardImg2 from "../img/bookyard-img-2.jpg";
import bookYardVideo from "../img/bookyard-video.mp4";

import townSendHero from "../img/townsend-hero-img.png";
import townSendImg1 from "../img/townsend-img-1.jpg";
import townSendImg2 from "../img/townsend-img-2.jpg";
import townSendImg3 from "../img/townsend-img-3.jpg";
import townSendImg4 from "../img/townsend-img-4.jpg";
import townSendImg5 from "../img/townsend-img-5.jpg";

import oblyHeroImg from "../img/olby-hero.png";
import oblyImg1 from "../img/olby-img-1.jpg";
import oblyImg2 from "../img/olby-img-2.jpg";
import oblyImg3 from "../img/olby-img-3.jpg";
import oblyImg4 from "../img/olby-img-4.jpg";
import oblyImg5 from "../img/olby-img-5.jpg";

export default function ProjectOverview() {
  const projectOverview = [
    {
      url: "jaye-food",
      nextProjectUrl: "shea-origin",
      HeroImg: jayeHeroImg,
      projectName: "Jaye<br/>Foods",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "Jaye Foods",
      projectType: "Digital branding",
      timeEstimation: "2 months",
      asset: [jayeImg4, jayeImg1, jayeImg2, jayeImg3],
      nextProjectName: "Shea Origin",
      nextProjectImage: sheaOriginImg2,
    },
    {
      url: "shea-origin",
      nextProjectUrl: "ywiit",
      HeroImg: sheaOriginHero,
      projectName: "Shea<br/>Origin",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "Shea Origin",
      projectType: "Digital branding",
      timeEstimation: "2 months",
      asset: [sheaOriginImg2, sheaOriginImg3, sheaOriginImg1],
      nextProjectName: "Ywiit",
      nextProjectImage: ywiitHero,
    },
    {
      url: "ywiit",
      nextProjectUrl: "book-yard-podcast",
      HeroImg: ywiitHero,
      projectName: "ywiit",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "YWIIT",
      projectType: "Digital Strategy",
      timeEstimation: "4 months",
      asset: [ywiitImg1, ywiitImg2, ywiitImg3],
      nextProjectName: "Book Yard Podcast",
      nextProjectImage: bookYardHeroImg,
    },
    {
      url: "book-yard-podcast",
      nextProjectUrl: "townsend-rail",
      HeroImg: bookYardHeroImg,
      projectName: "Book Yard<br/>Podcast",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "Book Yard Podcast",
      projectType: "Digital Strategy",
      timeEstimation: "3 months",
      asset: [bookYardImg1, bookYardImg2, bookYardVideo],
      nextProjectName: "Townsend Rail",
      nextProjectImage: townSendHero,
    },
    {
      url: "townsend-rail",
      nextProjectUrl: "olby",
      HeroImg: townSendHero,
      projectName: "Book Yard<br/>Podcast",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "Townsend Rail",
      projectType: "Digital Strategy",
      timeEstimation: "3 months",
      asset: [
        townSendImg1,
        townSendImg2,
        townSendImg3,
        townSendImg4,
        townSendImg5,
      ],
      nextProjectName: "Olby",
      nextProjectImage: oblyHeroImg,
    },
    {
      url: "olby",
      nextProjectUrl: "jaye-food",
      HeroImg: oblyHeroImg,
      projectName: "Olby",
      aboutUs:
        "Short description about the project goes here, we branded The company, designed their logo, defined their typography And colors. Also went ahead to develop their website",
      company: "Olby",
      projectType: "Digital Strategy",
      timeEstimation: "3 months",
      asset: [oblyImg1, oblyImg2, oblyImg3, oblyImg4, oblyImg5],
      nextProjectName: "jaye-food",
      nextProjectImage: jayeHeroImg,
    },
  ];

  // get the name of the project asked to display
  const requestedPageName = useParams().projectName;
  // loop through the project overview array
  let requestedPage = projectOverview.filter(
    // check if any of the project name is equal to the param value
    (projectOverview) => projectOverview.url === requestedPageName
  )[0];

  return (
    <section className="project-overview">
      <div
        style={{ backgroundImage: `url(${requestedPage.HeroImg})` }}
        className="overview-hero"
      >
        <div className="container row">
          <div
            className="project-name"
            dangerouslySetInnerHTML={{ __html: requestedPage.projectName }}
          />
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
              <p>{requestedPage.aboutUs}</p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <span>Project type:</span>
                  <span>{requestedPage.projectType}</span>
                </li>
                <li>
                  <span>For company:</span>
                  <span>{requestedPage.company}</span>
                </li>
                <li>
                  <span>Time estimation:</span>
                  <span>{requestedPage.timeEstimation}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="project-gallery">
            {requestedPage.asset.map((src) => {
              //check the source file is mp4
              if (CheckIfFileTypeIsVideo(src)) {
                //if its mp4 use a video tag to display it
                return (
                  <video
                    className="project-asset"
                    width="100%"
                    min-height="500px"
                    controls
                  >
                    <source src={src} type="video/mp4" />
                  </video>
                );
              } else {
                //else its an img
                return (
                  <img
                    className="project-asset"
                    src={src}
                    alt="a photo of women in tech"
                  />
                );
              }
            })}
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
      <NextProject
        nextProjectImage={requestedPage.nextProjectImage}
        nextProjectName={requestedPage.nextProjectName}
        nextProjectUrl={requestedPage.nextProjectUrl}
      />
    </section>
  );
}

function NextProject({ nextProjectImage, nextProjectName, nextProjectUrl }) {
  return (
    <div className="next-project">
      <div
        className="next-project_img"
        style={{ backgroundImage: `url(${nextProjectImage})` }}
      >
        <div className="project-details">
          <div className="project-name">{nextProjectName}</div>
          <div className="client-name">Client name</div>
        </div>
      </div>
      <Link to={`/${nextProjectUrl}`} className="next-project_button">
        <FontAwesomeIcon
          className="next-project_button_icon"
          icon={faArrowRightLong}
        />
      </Link>
    </div>
  );
}

//get file extension
function getFileExtension(file) {
  let fileArr = file.split(".");
  let fileExtension = fileArr[fileArr.length - 1];
  return fileExtension;
}

function CheckIfFileTypeIsVideo(file) {
  if (getFileExtension(file) === "mp4") return true;
  return false;
}
