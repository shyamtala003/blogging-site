require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// set default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(cookieParser());

// connect app to database
connectToDB();

// import routes
const userRoute = require("./router/userRoute");
const blogRoute = require("./router/blogRoute");
// set up routes
app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.listen(4000, () => {
  console.log("server listening on " + process.env.PORT);
});
