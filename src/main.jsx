import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/root.jsx";
import HomePage from "./pages/Home.jsx";
import AboutUsPage from "./pages/About-us.jsx";
import ProjectPage from "./pages/Projects.jsx";
import ContactUsPage from "./pages/Contact-us.jsx";
import ProjectOverview from "./components/ProjectOverview.jsx";

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
        path: "/:projectName",
        element: <ProjectOverview />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
