const express = require("express");
const passport = require("passport");
const session = require("express-session");
const flash = require('express-flash');
const cors = require("cors");
require("dotenv").config();

const morgan = require("morgan");
const path = require("path");
const helmet = require("helmet");
const strategy = require("./src/config/passportJwtStrategie.config");

const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

// CORS options
const corsOptions = {
  origin: "https://127.0.0.1:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // Override HTTP methods
app.use(passport.initialize()); 
app.use(cookieParser())

// Session configuration
app.use(
  session({
    secret: process.env.SECRET,
    name: "session",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Passport strategy configuration
strategy(passport);

// Flash messages
app.use(flash());

app.use(helmet()); 
app.use(morgan("dev"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

module.exports = app;
