import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AppDevelopment from "../components/AppDevelopement";
import SuccessProject from "../components/SuccessProject";
import Projects from "../components/FeaturedProject";
import Benefits from "../components/Benefits";
import Plan from "../components/Plan";
import AstonishingResult from "../components/AstonishingResult";
import Testimonial from "../components/Testimonials";
import ContactUs from "../components/ContactUs";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* <AppDevelopment /> */}
      <SuccessProject />
      <Projects />
      <Benefits />
      <Plan />
      <AstonishingResult />
      <Testimonial />
      <ContactUs />
    </>
  );
}
