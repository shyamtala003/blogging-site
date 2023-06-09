import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoDark from "../assets/Screenshot__112_-removebg-preview.png";
import logoLight from "../assets/logo_light.png";
// import googleLogo from "../assets/google.svg";
import Axios from "axios";
import Toast from "../context/Toast";
import Theme from "../context/Theme";
import UserLoggedin from "../context/UserLoggedin";

const Login = () => {
  // toastmessage context
  const { toastMessage, set_toast } = Toast();

  // userloggedn provider
  let { isUserLoggedin, set_isUserLoggedin } = UserLoggedin();

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme } = Theme();

  async function loginUser(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let url = import.meta.env.VITE_API_URL;
      let response = await Axios.post(
        `${url}/login`,
        {
          email: String(email).toLowerCase(),
          password: password,
        },
        { withCredentials: true }
      );

      // set token into  localstorage for further use
      let token = response.data.message.token;
      localStorage.setItem("token", token);

      setEmail("");
      setPassword("");
      setLoading(false);
      set_isUserLoggedin(true, response.data.message.username);
      navigate("/");
    } catch (error) {
      if (error.response.data.success === false) {
        setLoading(false);
        set_toast("error", error.response.data.message);
      }
    }
  }

  return (
    <div className="register">
      <img
        src={theme === "dark" ? logoDark : logoLight}
        alt=""
        className="form_logo"
      />
      <h1 className="form_heading">Login</h1>
      <form className="form" onSubmit={loginUser}>
        <div className="input_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="input_box"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            disabled={loading ? true : false}
          />
        </div>
        <div className="input_group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input_box"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            disabled={loading ? true : false}
          />
        </div>
        {loading ? (
          <button
            disabled={true}
            style={{ cursor: "no-drop" }}
            className="register_btn"
          >
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </button>
        ) : (
          <button type="submit" className="login_btn">
            Login
          </button>
        )}

        {/* <div className="external_login_divider">
          <span className="external_login_divider_text">or</span>
        </div>
        <a href="/" className="external_btn">
          <img src={googleLogo} alt="" />
          <span>Continue with Google</span>
        </a> */}
      </form>
    </div>
  );
};

export default Login;
