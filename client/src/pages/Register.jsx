import logo from "../assets/Screenshot__112_-removebg-preview.png";
import googleLogo from "../assets/google.svg";

const Register = () => {
  return (
    <div className="register">
      <img src={logo} alt="" className="form_logo" />
      <h1 className="form_heading">Register</h1>
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
