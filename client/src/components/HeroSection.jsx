import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiamond,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

function HeroContentSecondary() {
  let sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    pauseOnHover: true,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="hero_content-secondary">
      <h1 className="hero_content-secondary-title">PREVIOUS CLIENTS</h1>
      <p>
        Here are some successful projects, and businesses like yours that
        we’ve helped achieve their goals.
      </p>
      <div className="slider">
        <Slider {...settings} ref={sliderRef} className="previous-clients">
          <img
            className="previous-clients__logo"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745365/DMSL-BETA/townsend-img-1_shvrtr.jpg"
            alt="previous clients logos"
          />
          <img
            className="previous-clients__logo"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745322/DMSL-BETA/jaye-img-1_aggqrn.jpg"
            alt="previous clients logos"
          />
          <img
            className="previous-clients__logo"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745371/DMSL-BETA/shea-origin-img-1_zz1ugp.png"
            alt="previous clients logos"
          />
          <img
            className="previous-clients__logo"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745390/DMSL-BETA/ywiit-img-3_bcrowp.jpg"
            alt="previous clients logos"
          />
          <img
            className="previous-clients__logo"
            src="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745308/DMSL-BETA/bookyard-hero_sxodza.png"
            alt="previous clients logos"
          />
        </Slider>
        <div className="slider__btns">
          <div className="slider__btn" onClick={previousSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div className="slider__btn" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="container secondary-container">
        <div className="hero_content">
         {/*  <h1 className="hero_content-header">
            Digital and Media Services Limited
          </h1> */}
          <h1 className="hero_content-big">
            Grow Your Business with Our Comprehensive <span>Digital </span>
             Solutions
          </h1>
          <p>
            We stay up to date with digital trends and know the best tools to
            help you navigate the digital space effectively. We focus on
            achieving your goals and delivering tangible results.
          </p>
          <FontAwesomeIcon icon={faDiamond} className="diamond" />
        </div>
        {/* hero content secondary */}
        <HeroContentSecondary />
      </div>
    </section>
  );
}
