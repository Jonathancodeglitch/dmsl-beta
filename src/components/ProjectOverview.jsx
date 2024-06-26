import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

import ywiitHero from "../img/ywiit.png";
import ywiitBannner from "../img/ywiit-banner.png";
import bookYard from "../img/next-project-img.png";

import jayeHeroImg from "../img/Jaye-hero-img.jpg";
import jayeImg1 from "../img/jaye-img-1.jpg";
import jayeImg2 from "../img/jaye-img-2.jpg";
import jayeImg3 from "../img/jaye-img-3.jpg";
import jayeImg4 from "../img/jaye-img-4.png";

import sheaOriginHero from "../img/shea-origin-hero.png";
import sheaOriginImg1 from "../img/shea-origin-img-1.png";

import bookYardHeroImg from "../img/bookyard-hero.png";
import bookYardImg1 from "../img/bookyard-img1.png";

import townSendHero from "../img/townsend-hero-img.png";
import townSendImg1 from "../img/townsend-img1.png";

import oblyHeroImg from "../img/olby-hero.png";
import oblyImg1 from "../img/olby-img1.png";

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
      nextProjectImage: ywiitBannner,
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
      asset: [sheaOriginImg1, sheaOriginImg1, sheaOriginImg1],
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
      asset: [ywiitBannner, ywiitBannner, ywiitBannner],
      nextProjectName: "Book Yard Podcast",
      nextProjectImage: bookYard,
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
      asset: [bookYardImg1, bookYardImg1, bookYardImg1],
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
      asset: [oblyImg1, oblyImg1, oblyImg1],
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
      asset: [oblyImg1, oblyImg1, oblyImg1],
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
          {/* project details ends */}
          {/* project gallery*/}
          <div className="project-gallery">
            {requestedPage.asset.map((src) => {
              return (
                <div className="project-img">
                  <img src={src} alt="a photo of women in tech" />
                </div>
              );
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
