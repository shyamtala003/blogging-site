require("dotenv").config();
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

// import blog model for strore blog posts
const Post = require("../model/Blog");

// create a new blog post
exports.createPost = async (req, res) => {
  try {
    // 1. get token and validate user
    let decode;
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.header("Authorization")
        ? req.header("Authorization").replace("Bearer ", "")
        : false);

    // 2.if token to exist then send error response
    if (!token) {
      return res
        .status(402)
        .json({ success: false, message: "token not found" });
    }

    try {
      decode = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      // 3.if token is not validated
      return res.status(402).send("token is not validate " + error.message);
    }

    // 2. grab information from frontend
    const imageFile = req.file;
    const { title, summary, subject, description } = req.body;

    // if any thing is missing from user input then
    if (!(title && summary && description && subject && imageFile)) {
      return res.status(403).json({
        success: false,
        message: "please fill all the required fields",
      });
    }

    // 3. upload image on cloudinary and grab image url from result
    const result = await cloudinary.v2.uploader.upload(imageFile.path, {
      folder: "dotblogs",
    });
    const coverImage = result.secure_url;

    // 4. store data into database
    let post = await Post.create({
      author: decode.id,
      title,
      summary,
      subject,
      coverImage,
      description,
    });
    res.status(201).json({ success: true, message: { post } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// fetch all blog posts
exports.getAllBlogs = async (req, res) => {
  try {
    let blogs = await Post.find().populate("author");
    res.status(200).json({ success: true, message: { ...blogs } });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
