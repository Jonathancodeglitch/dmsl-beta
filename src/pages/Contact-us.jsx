import ContactUs from "../components/ContactUs";
import SecondaryHeroSection from "../components/SecondaryHeroSection";
import contactUsHeroImg from "../img/businesswoman-img.png";

export default function ContactUsPage() {
  let heroBigText = (
    <>
      Experience the Magic Of <span>DMSL</span>
    </>
  );

  return (
    <>
      <SecondaryHeroSection
        heroIntro="TELL US EVERYTHING"
        heroBigText={heroBigText}
        heroDesc="Questions? Comments? Concerns? We are here for your everyday Digital needs. Send us a message, We’d love to hear from you"
        heroImg={contactUsHeroImg}
        name="contact-us-hero"
      />
      <ContactUs />
    </>
  );
}
