const User = require("../model/User");

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
        message: { token },
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
        message: { token },
      });
  } catch (error) {
    console.log(error);
  }
};
