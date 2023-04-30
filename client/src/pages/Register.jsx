import { useContext, useState } from "react";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import googleLogo from "../assets/google.svg";
import Axios from "axios";

// toast message context
import toastMessageContext from "../context/ToastContext";

const Register = () => {
  // toastmessage context
  let { setToastMessage } = useContext(toastMessageContext);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();

    try {
      let url = import.meta.env.VITE_API_URL;
      console.log(url);
      let response = await Axios.post(`${url}/register`, {
        userName: userName,
        password: password,
        email: String(email).toLowerCase(),
      });

      setUserName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response.data.success === false) {
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
          />
        </div>
        <button type="submit" className="register_btn">
          Register
        </button>
        <div className="external_login_divider">
          <span className="external_login_divider_text">or</span>
        </div>
        <a href="/" className="external_btn">
          <img src={googleLogo} alt="" />
          <span>Continue with Google</span>
        </a>
      </form>
    </div>
  );
};

export default Register;
