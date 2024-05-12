const express = require('express');
const passport = require('passport');
const session = require('express-session')
require('dotenv').config()

const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const strategy = require('./src/config/passportJwtStrategie.config')

const app = express();
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const multer = require('multer');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(passport.initialize());

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRET,
    name: "session",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

strategy(passport)

app.use(helmet())
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

module.exports = app

