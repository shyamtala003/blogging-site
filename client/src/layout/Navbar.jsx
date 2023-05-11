import { Link } from "react-router-dom";
import logoDark from "../assets/Screenshot__112_-removebg-preview.png";
import logoLight from "../assets/logo_light.png";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import searchDarkIcon from "../assets/search_dark.svg";
import Hamburger from "hamburger-react";
import { useContext, useEffect, useState } from "react";

// toast message context
import toastMessageContext from "../context/ToastContext";

// theme context
import ThemeContext from "../context/ThemeContest";

// searchbarContext
import searchBarContext from "../context/SearchBarContext";

import userLoggedinContext from "../context/UserLoggedin";
import Axios from "axios";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  let { userLoggedIn, setUserLoggedIn } = useContext(userLoggedinContext);
  // toastmessage context provider
  let { setToastMessage } = useContext(toastMessageContext);
  let { theme, setTheme } = useContext(ThemeContext);
  let { openSearchBar, setOpenSearchBar } = useContext(searchBarContext);

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
          profilePic: res.data.profilePic,
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
          {/* logo */}
          <Link to="/" className="logo">
            <img
              src={theme === "dark" ? logoDark : logoLight}
              alt="logo"
              className="logo_image"
            />
          </Link>

          {/*SEARCHBAR  */}
          <div
            className="search_btn"
            onClick={() => {
              setOpenSearchBar(!openSearchBar);
            }}
          >
            <div className="left">
              <img src={searchDarkIcon} alt="" />
              <span className="search_placeholder">Find blogs...</span>
            </div>
            <div className="right">
              <div className="searchbar_shortcut">
                <span>Ctrl</span> + <span>K</span>
              </div>
            </div>
          </div>
          {/*NAVBAR LINKS  */}
          <div className="nav_links">
            <button
              className="theme_toggler"
              aria-label="theme_toggler"
              onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark");
                localStorage.setItem(
                  "theme",
                  theme === "dark" ? "light" : "dark"
                );
              }}
            >
              <img src={theme === "dark" ? sun : moon} alt="" />
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
                  {/* <img
                    className="profile_pic"
                    src={userLoggedIn.profilePic}
                    alt=""
                  /> */}
                </button>
              </>
            )}
          </div>

          <div className="mobile_menu_buttons">
            <button
              className="btn_search"
              onClick={() => {
                setOpenSearchBar(!openSearchBar);
              }}
            >
              <img src={searchDarkIcon} alt="" />
            </button>

            <button
              className="menu_toggler"
              onClick={() => {
                setOpenNavbar(!openNavbar);
              }}
            >
              <Hamburger
                toggled={openNavbar}
                toggle={setOpenNavbar}
                color={theme === "dark" ? "#fff" : "#000"}
                size={15}
              />
            </button>
          </div>

          <div
            className={`mobile_menu ${openNavbar ? "navbar_open" : ""}`}
            onClick={() => {
              setOpenNavbar(!openNavbar);
            }}
          >
            <div className="nav_links_mobile">
              <button
                className="theme_toggler"
                aria-label="theme_toggler"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  localStorage.setItem(
                    "theme",
                    theme === "dark" ? "light" : "dark"
                  );
                }}
              >
                <img src={theme === "dark" ? sun : moon} alt="" />
                {theme === "dark" ? "Light" : "Dark"}
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

      <SearchBar> </SearchBar>
    </>
  );
};

export default Navbar;
