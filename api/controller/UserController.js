const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    //1. collect data from user
    const { userName, email, password } = req.body;

    // 2. check user already exists or not
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    // 3 store data into database
    user = await User.create({ userName, email, password });

    // 4.if all is good then send token in cookie
    // generate a token and send it in cookie and json response
    const token = user.generateJwtToken();

    // 5. return response
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        message: { token, username: user.userName },
      });
  } catch (error) {
    res.status(200).json({ success: false, message: { error } });
  }
};

exports.login = async (req, res) => {
  try {
    // 1.collect data from user
    let { email, password } = req.body;

    //2.check user data exist or not
    if (!(email && password)) {
      return res
        .status(402)
        .json({ success: false, message: "please enter email and password" });
    }

    // 3.fetch data from database using email
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "no user found in over records from this email: " + email,
      });
    }

    // 4.compare password
    let isPasswordMatched = await user.isValidatedPassword(password);
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ success: false, message: "invalid password" });
    }

    // 5.if all is good then send token in cookie
    // generate a token and send it in cookie and json response
    const token = user.generateJwtToken();

    // remove password from response
    user.password = undefined;
    res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
      })
      .json({
        success: true,
        message: { token, username: user.userName },
      });
  } catch (error) {
    console.log(error);
  }
};

exports.profile = async (req, res) => {
  const token =
    req.cookies.token ||
    req.body.token ||
    (req.header("Authorization")
      ? req.header("Authorization").replace("Bearer ", "")
      : false);

  // 2.if token to exist then send error response
  if (!token) {
    return res.status(402).json({ success: false, message: "token not found" });
  }

  let decode;
  try {
    decode = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    // 3.if token is not validated
    return res.status(402).send("token is not validate " + error.message);
  }

  // 4. if token is validate then find user in database
  res.status(200).json(decode);
};

exports.logout = (req, res) => {
  res.status(200).clearCookie("token").json({ success: true, message: {} });
};
