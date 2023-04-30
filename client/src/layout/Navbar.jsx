import { Link } from "react-router-dom";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import Hamburger from "hamburger-react";
import { useState } from "react";

const Navbar = () => {
  const [openNavbar, setOpenNavbar] = useState(false);
  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <img src={logo} alt="logo" className="logo_image" />
        </Link>

        <div className="nav_links">
          <button className="theme_toggler">
            <img src={sun} alt="" />
          </button>
          <Link to="/login" className="nav_link">
            Log in
          </Link>
          <Link to="/register" className="nav_link">
            Sign up
          </Link>
        </div>

        <button
          className="menu_toggler"
          onClick={() => {
            setOpenNavbar(!openNavbar);
          }}
        >
          <Hamburger
            toggled={openNavbar}
            toggle={setOpenNavbar}
            color="#fff"
            size={20}
          />
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
            <Link to="/login" className="nav_link">
              Log in
            </Link>
            <Link to="/register" className="nav_link">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
