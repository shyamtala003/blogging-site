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

    // 4. return response
    res.status(201).json({ success: true, message: { user } });
  } catch (error) {
    res.status(200).json({ success: false, message: { error } });
  }
};
