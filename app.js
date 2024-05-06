const express = require('express');

const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

module.exports = app

