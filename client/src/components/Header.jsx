import logo from "../img/Logo-dark.svg";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  // to check if we are currently on the project overview page
  // check if the property exist
  //if it does add a class to the header
  const location = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path, hash) => {
    return location.pathname === path && location.hash === hash;
  };

  return (
    <header className={"projectName" in useParams() ? "project-overview" : ""}>
      <div className="container row  navbar_expand">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="menu-btn">
          <Hamburger
            size={30}
            toggled={isOpen}
            toggle={setOpen}
            color="#27BDF3"
          />
        </div>

        <ul className={isOpen ? "nav show" : "nav"}>
          <li className="nav_list">
            <NavLink
              className={({ isActive }) =>
                [
                  "nav_link",
                  isActive && location.pathname == "/" && location.hash == ""
                    ? "active"
                    : "",
                ].join(" ")
              }
              to="/"
              
            >
              Home
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink className="nav_link" to="about-us">
              ABOUT US
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink className="nav_link" to="/projects">
              OUR PROJECTS
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              to="/#services"
              className={({ isActive }) =>
                [
                  "nav_link",
                  isActive && location.hash == "#services" ? "active" : "",
                ].join(" ")
              }
            >
              SERVICES
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              to="/#packages"
              className={({ isActive }) =>
                [
                  "nav_link",
                  isActive && location.hash == "#packages" ? "active" : "",
                ].join(" ")
              }
            >
              PACKAGES
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink className="nav_link  nav_btn btn" to="/contact-us">
              CONTACT US
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
