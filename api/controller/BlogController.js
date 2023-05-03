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
    let blogs = await Post.find()
      .select("title summary subject coverImage createdAt")
      .populate("author", "userName")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ success: true, message: { ...blogs } });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

// fetch perticular blog posts
exports.fetchBlogPosts = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    let blog = await Post.findById({ _id: blogId }).populate("author");
    res.status(200).json(blog);
  } catch (error) {
    res.status(401).json({ success: false, message: error });
  }
};

// edit blog posts
exports.editPost = async (req, res) => {
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
    const { title, summary, subject, description, currentImageUrl } = req.body;

    // if any thing is missing from user input then
    if (!(title && summary && description && subject)) {
      return res.status(403).json({
        success: false,
        message: "please fill all the required fields",
      });
    }

    // 3. upload image on cloudinary and grab image url from result
    let coverImage;
    if (req.file !== undefined) {
      cloudinary.v2.uploader.destroy(cloudinary.url(currentImageUrl));
      const result = await cloudinary.v2.uploader.upload(imageFile.path, {
        folder: "dotblogs",
      });
      coverImage = result.secure_url;
    }

    // 4. store data into database
    let post = await Post.findById({ _id: req.body._id });

    // if anything is same as past then we don't want to change that data
    if (post.title !== title) {
      post.title = title;
    }
    if (post.description !== description) {
      post.description = description;
    }
    if (post.summary !== summary) {
      post.summary = summary;
    }
    if (post.subject !== subject) {
      post.subject = subject;
    }
    if (post.coverImage !== coverImage) {
      post.coverImage = coverImage;
    }
    let result = await post.save();
    res.status(201).json({
      success: true,
      message: { result },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
