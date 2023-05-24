import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from "../assets/Screenshot__112_-removebg-preview.png";
import logoLight from "../assets/logo_light.png";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import searchDarkIcon from "../assets/search_dark.svg";
import Hamburger from "hamburger-react";
import Toast from "../context/Toast";
import Theme from "../context/Theme";
import SearchBarContext from "../context/SearchBar";
import UserLoggedin from "../context/UserLoggedin";
import Axios from "axios";
import SearchBar from "../components/SearchBar";

const Navbar = () => {
  // toastmessage context provider
  const { set_toast } = Toast();
  const { theme, toggle_theme } = Theme();
  const { openSearchBar, set_openSearchBar } = SearchBarContext();
  const { isUserLoggedin, set_isUserLoggedin } = UserLoggedin();

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
        set_isUserLoggedin({
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
        set_isUserLoggedin({ value: false });
        set_toast("success", "user logged Out successfully");
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
              set_openSearchBar(!openSearchBar);
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
                toggle_theme();
              }}
            >
              <img src={theme === "dark" ? sun : moon} alt="" />
            </button>
            {!isUserLoggedin.value ? (
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
                  Logout ({isUserLoggedin.username})
                  <img
                    className="profile_pic"
                    src={isUserLoggedin.profilePic}
                    alt=""
                  />
                </button>
              </>
            )}
          </div>

          <div className="mobile_menu_buttons">
            <button
              className="btn_search"
              aria-label="search button"
              onClick={() => {
                set_openSearchBar(!openSearchBar);
              }}
            >
              <img src={searchDarkIcon} alt="" />
            </button>

            <button
              className="menu_toggler"
              aria-label="menu toggler button"
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
                  toggle_theme();
                }}
              >
                <img src={theme === "dark" ? sun : moon} alt="" />
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              {!isUserLoggedin.value ? (
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
                    Logout ({isUserLoggedin.username})
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
