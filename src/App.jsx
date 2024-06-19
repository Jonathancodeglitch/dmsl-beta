import HomePage from "./pages/Home";
import ContactUsPage from "./pages/Contact-us";
import AboutUsPage from "./pages/About-us";
import ProjectPage from "./pages/Projects";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/contact-us" element={<ContactUsPage />} />
      <Route exact path="/about-us" element={<AboutUsPage />} />
      <Route exact path="/projects" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
