require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");

// set default middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "https://dotblogs.vercel.app/", credentials: true }));
app.use(cookieParser());

// connect app to database
connectToDB();

// import routes
const userRoute = require("./router/userRoute");

// set up routes
app.use("/api/v1", userRoute);

app.listen(4000, () => {
  console.log("server listening on " + process.env.PORT);
});
