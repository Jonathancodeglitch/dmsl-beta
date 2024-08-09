import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/scrollToTop";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
