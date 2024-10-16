import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./css/style.css";
import Root from "./pages/root.jsx";
import HomePage from "./pages/Home.jsx";
import AboutUsPage from "./pages/About-us.jsx";
import ProjectPage from "./pages/Projects.jsx";
import ContactUsPage from "./pages/Contact-us.jsx";
import Services from "./pages/servicesPage.jsx";
import Packages from "./pages/PackagesPage.jsx";
import ProjectOverview from "./components/ProjectOverview.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import Admin from "./pages/Admin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "projects",
        element: <ProjectPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "/:projectName",
        element: <ProjectOverview />,
      },
      {
        path: "/Admin",
        element: <Admin />,
      },
    ],
  },
  { path: "success-page", element: <SuccessPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
