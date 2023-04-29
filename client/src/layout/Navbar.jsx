import React from "react";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import menu_light from "../assets/menu_light.svg";
import close_light from "../assets/close_light.svg";
import { useState } from "react";

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <>
      <nav>
        <div className="logo">
          <img src={logo} alt="logo" className="logo_image" />
        </div>

        <div className="nav_links">
          <button className="theme_toggler">
            <img src={sun} alt="" />
          </button>
          <a href="#" className="nav_link">
            Log in
          </a>
          <a href="#" className="nav_link">
            Sign up
          </a>
        </div>

        <button
          className="menu_toggler"
          onClick={() => {
            setOpenNavbar(!openNavbar);
          }}
        >
          <img src={openNavbar ? close_light : menu_light} alt="" />
        </button>

        <div
          className={`mobile_menu ${openNavbar ? "navbar_open" : ""}`}
          onClick={() => {
            setOpenNavbar(!openNavbar);
          }}
        >
          <div className="nav_links_mobile">
            <button className="theme_toggler">
              <img src={sun} alt="" />
            </button>
            <a href="#" className="nav_link">
              Log in
            </a>
            <a href="#" className="nav_link">
              Sign up
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
