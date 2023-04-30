import React from "react";
import logo from "../assets/Screenshot__112_-removebg-preview.png";
import googleLogo from "../assets/google.svg";

const Login = () => {
  return (
    <div className="login">
      <img src={logo} alt="" className="form_logo" />
      <h1 className="form_heading">Log in</h1>
      <form method="post" className="form">
        <div className="input_group">
          <label htmlFor="email">Email</label>
          <input type="email" className="input_box" name="email" id="email" />
        </div>
        <div className="input_group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="input_box"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="login_btn">
          Login
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

export default Login;
