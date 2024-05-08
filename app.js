const express = require('express');
const passport = require('passport')

const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');
const strategy = require('./src/config/passportJwtStrategie.config')

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
strategy(passport)
app.use(express.json());

app.use(helmet())
app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

module.exports = app

