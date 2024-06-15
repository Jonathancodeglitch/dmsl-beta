import logo from "../img/Logo-dark.svg";
import { Divide as Hamburger } from "hamburger-react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  return (
    <header>
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
          <li className="nav_list active">
            <a className="nav_link" href="#">
              Home
            </a>
          </li>
          <li className="nav_list">
            <a className="nav_link" href="#">
              ABOUT US
            </a>
          </li>
          <li className="nav_list">
            <a className="nav_link" href="#">
              PROJECTS
            </a>
          </li>
          <li className="nav_list  nav_btn btn">
            <a className="nav_link" href="#">
              CONTACT US
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
