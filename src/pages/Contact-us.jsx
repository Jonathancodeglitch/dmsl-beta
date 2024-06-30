import ContactUs from "../components/ContactUs";
import SecondaryHeroSection from "../components/SecondaryHeroSection";

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
        heroImg="https://res.cloudinary.com/dv6uz0bks/image/upload/v1719745313/DMSL-BETA/businesswoman-img_ognyly.png"
        name="contact-us-hero"
      />
      <ContactUs />
    </>
  );
}
