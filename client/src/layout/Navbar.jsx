import { Link } from "react-router-dom";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import Hamburger from "hamburger-react";
import { useContext, useEffect, useState } from "react";

// toast message context
import toastMessageContext from "../context/ToastContext";

import userLoggedinContext from "../context/UserLoggedin";
import Axios from "axios";

const Navbar = () => {
  let { userLoggedIn, setUserLoggedIn } = useContext(userLoggedinContext);
  // toastmessage context provider
  let { setToastMessage } = useContext(toastMessageContext);

  useEffect(() => {
    let url = import.meta.env.VITE_API_URL;
    Axios.defaults.withCredentials = true;

    const token = localStorage.getItem("token");

    Axios.get(`${url}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUserLoggedIn({
          value: true,
          username: res.data.userName,
          userId: res.data.id,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [openNavbar, setOpenNavbar] = useState(false);

  // logout user
  function logout() {
    localStorage.removeItem("token");
    let url = import.meta.env.VITE_API_URL;
    Axios.defaults.withCredentials = true;
    Axios.post(`${url}/logout`)
      .then((res) => {
        setUserLoggedIn({ value: false });
        setToastMessage({
          type: "success",
          message: "user logged Out successfully",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      <nav>
        <div className="navbar_content">
          <Link to="/" className="logo">
            <img src={logo} alt="logo" className="logo_image" />
          </Link>

          <div className="nav_links">
            <button className="theme_toggler">
              <img src={sun} alt="" />
            </button>
            {!userLoggedIn.value ? (
              <>
                <Link to="/login" className="nav_link">
                  Log in
                </Link>
                <Link to="/register" className="nav_link">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                <Link to="/create" className="nav_link">
                  Create New Post
                </Link>
                <button onClick={logout} className="nav_link">
                  Logout ({userLoggedIn.username})
                </button>
              </>
            )}
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
              {!userLoggedIn.value ? (
                <>
                  <Link to="/login" className="nav_link">
                    Log in
                  </Link>
                  <Link to="/register" className="nav_link">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/create" className="nav_link">
                    Create New Post
                  </Link>
                  <button onClick={logout} className="nav_link  logout">
                    Logout ({userLoggedIn.username})
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
