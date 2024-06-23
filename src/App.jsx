import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ContactUsPage from "./pages/Contact-us";
import AboutUsPage from "./pages/About-us";
import ProjectPage from "./pages/Projects";
import ProjectOverview from "./components/ProjectOverview";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/contact-us" element={<ContactUsPage />} />
      <Route path="/about-us" element={<AboutUsPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/project-overview" element={<ProjectOverview />} />
    </Routes>
  );
}

export default App;
