import { useContext, useState } from "react";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import googleLogo from "../assets/google.svg";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

// userloggedin context
import userLoggedinContext from "../context/UserLoggedin";

// toast message context
import toastMessageContext from "../context/ToastContext";

const Register = () => {
  // toastmessage provider
  let { setToastMessage } = useContext(toastMessageContext);

  // userloggedn provider
  let { userLoggedIn, setUserLoggedIn } = useContext(userLoggedinContext);
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true);

    let data = new FormData();
    data.set("userName", userName);
    data.set("password", password);
    data.set("email", String(email).toLowerCase());
    data.set("file", file[0]);

    try {
      console.log(file);
      let url = import.meta.env.VITE_API_URL;
      let response = await Axios.post(`${url}/register`, data, {
        withCredentials: true,
      });

      // set token into  localstorage for further use
      let token = response.data.message.token;
      localStorage.setItem("token", token);

      setUserName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setUserLoggedIn({
        value: true,
        username: response.data.message.username,
      });
      navigate("/");
    } catch (error) {
      if (error.response.data.success === false) {
        setLoading(false);
        setToastMessage({
          type: "error",
          message: error.response.data.message,
        });
      }
    }
  }

  return (
    <div className="register">
      <img src={logo} alt="" className="form_logo" />
      <h1 className="form_heading">Register</h1>
      <form className="form" onSubmit={registerUser}>
        <div className="input_group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="input_box"
            name="username"
            id="username"
            required
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            disabled={loading ? true : false}
          />
        </div>
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
        <div className="input_group">
          <label htmlFor="profile_img">Add Profile pic</label>
          <input
            type="file"
            name="profile_pic"
            className="input_box"
            required
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files);
            }}
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
          <button type="submit" className="register_btn">
            Register
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

export default Register;
