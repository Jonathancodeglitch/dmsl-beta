import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

export default function ProjectOverview() {
  const projectOverview = [
    {
      url: "jaye-food",
      nextProjectUrl: "shea-origin",
      HeroImg:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745327/DMSL-BETA/Jaye-hero-img_jjvxqa.jpg",
      projectName: "Jaye<br/>Foods",
      aboutUs:
        "For Jaye Foods, and FMCG brand based in Nigeria, we created the company's brand identity, including their logo, typography, and color scheme. We also developed their website to establish a cohesive and impactful online presence.",
      company: "Jaye Foods",
      projectType: "Digital branding",
      timeEstimation: "2 months",
      asset: [
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745334/DMSL-BETA/jaye-img-4_ucputu.png",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745322/DMSL-BETA/jaye-img-1_aggqrn.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745318/DMSL-BETA/jaye-img-2_bd9hla.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745321/DMSL-BETA/jaye-img-3_gtoeuq.jpg",
      ],
      nextProjectName: "Shea Origin",
      nextProjectImage:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745362/DMSL-BETA/shea-origin-img-2_wpofka.jpg",
    },
    {
      url: "shea-origin",
      nextProjectUrl: "ywiit",
      HeroImg:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745377/DMSL-BETA/shea-origin-hero_hz1boz.png",
      projectName: "Shea<br/>Origin",
      aboutUs:
        "We designed their products brochure using branded typography and colours",
      company: "Shea Origin",
      projectType: "Digital branding",
      timeEstimation: "2 months",
      asset: [
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745362/DMSL-BETA/shea-origin-img-2_wpofka.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745360/DMSL-BETA/shea-origin-img-3_gbfhvf.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745371/DMSL-BETA/shea-origin-img-1_zz1ugp.png",
      ],
      nextProjectName: "Ywiit",
      nextProjectImage:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745391/DMSL-BETA/ywiit_zfxw9q.png",
    },
    {
      url: "ywiit",
      nextProjectUrl: "book-yard-podcast",
      HeroImg:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745391/DMSL-BETA/ywiit_zfxw9q.png",
      projectName: "ywiit",
      aboutUs:
        "We branded th company, designed their logo, defined their typography and colors, also went ahead to develop their website",
      company: "YWIIT",
      projectType: "Digital Strategy",
      timeEstimation: "4 months",
      asset: [
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745387/DMSL-BETA/ywiit-img-1_mvvt4w.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745388/DMSL-BETA/ywiit-img-2_uon4eb.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745390/DMSL-BETA/ywiit-img-3_bcrowp.jpg",
      ],
      nextProjectName: "Book Yard Podcast",
      nextProjectImage:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745308/DMSL-BETA/bookyard-hero_sxodza.png",
    },
    {
      url: "book-yard-podcast",
      nextProjectUrl: "townsend-rail",
      HeroImg:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745308/DMSL-BETA/bookyard-hero_sxodza.png",
      projectName: "Book Yard<br/>Podcast",
      aboutUs:
        "For the Book Yard Podcast, we designed the logo, created branding assets and social media templates, and produced an announcement motion video for digital publicity and engagement",
      company: "Book Yard Podcast",
      projectType: "Digital Strategy",
      timeEstimation: "3 months",
      asset: [
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745302/DMSL-BETA/bookyard-img-1_esizii.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745306/DMSL-BETA/bookyard-img-2_avifpr.jpg",
        "https://res.cloudinary.com/dv6uz0bks/video/upload/v1719745378/DMSL-BETA/bookyard-video_jb7ijl.mp4",
      ],
      nextProjectName: "Townsend Rail",
      nextProjectImage:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745378/DMSL-BETA/townsend-hero-img_vvnxdm.png",
    },
    {
      url: "townsend-rail",
      nextProjectUrl: "jaye-food",
      HeroImg:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745378/DMSL-BETA/townsend-hero-img_vvnxdm.png",
      projectName: "Townsend<br/>Rail",
      aboutUs:
        "We branded the company, designed their logo, defined their typography and colors, also went ahead to develop their website.",
      company: "Townsend Rail",
      projectType: "Digital Strategy",
      timeEstimation: "3 months",
      asset: [
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745365/DMSL-BETA/townsend-img-1_shvrtr.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745368/DMSL-BETA/townsend-img-2_rvf72m.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745368/DMSL-BETA/townsend-img-3_ow0suu.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745369/DMSL-BETA/townsend-img-4_ha6wcp.jpg",
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745379/DMSL-BETA/townsend-img-5_njfaju.jpg",
      ],
      nextProjectName: "jaye-foods",
      nextProjectImage:
        "https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745327/DMSL-BETA/Jaye-hero-img_jjvxqa.jpg",
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
              <h1>ABOUT THIS PROJECT</h1>
              <p>{requestedPage.aboutUs}</p>
            </div>
            <div className="right">
              <ul>
                <li>
                  <span>Project type:</span>
                  <span>{requestedPage.projectType}</span>
                </li>
                <li>
                  <span>Client:</span>
                  <span>{requestedPage.company}</span>
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
            <h1>Did you like this?</h1>
            <p>
              We can achieve similar results with your business.
              <br />
              Let's make your brand the next success story
            </p>
            <Link to="/#packages" className="enquiry-btn">
              Get Started!
            </Link>
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
