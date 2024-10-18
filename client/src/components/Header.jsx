import logo from "../img/Logo-dark.svg";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  function handleNavigationToggle() {
    setOpen(!isOpen);
  }

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
              onClick={handleNavigationToggle}
              className="nav_link"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              onClick={handleNavigationToggle}
              className="nav_link"
              to="about-us"
            >
              ABOUT US
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              onClick={handleNavigationToggle}
              className="nav_link"
              to="/projects"
            >
              OUR PROJECTS
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              onClick={handleNavigationToggle}
              className="nav_link"
              to="services"
            >
              SERVICES
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              onClick={handleNavigationToggle}
              className="nav_link"
              to="packages"
            >
              PACKAGES
            </NavLink>
          </li>
          <li className="nav_list">
            <NavLink
              onClick={handleNavigationToggle}
              className="nav_link  nav_btn btn"
              to="/contact-us"
            >
              CONTACT US
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
