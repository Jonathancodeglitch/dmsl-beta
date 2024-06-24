import SecondaryHeroSection from "../components/SecondaryHeroSection";
import Header from "../components/Header";
import aboutUsHeroImg from "../img/about-us-hero-img.png";
import MeetUs from "../components/MeetUs";
import Footer from "../components/Footer";

export default function AboutUsPage() {
  return (
    <>
      <SecondaryHeroSection
        heroIntro="GET TO KNOW US"
        heroBigText={
          <>
            DMSL, Where <span>Creativity </span>Meets Technology
          </>
        }
        heroDesc="At DMSL, we recognise that at the heart of any solution lies STRATEGY, and that can only be acquired through use of accurate DATA. We believe that technology and digital transformation will continue to play a key role in creating solutions for sustainable business growth and profit for the 21st century business. “We, therefore, provide services and solutions to support and enable your business achieve a boost in customer acquisition, retention and growth in profit margins"
        heroImg={aboutUsHeroImg}
        name="about-us"
      />
      <MeetUs />
    </>
  );
}
