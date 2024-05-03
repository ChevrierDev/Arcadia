const express = require('express');

const morgan = require('morgan');
const path = require('path');
const helmet = require('helmet');

const app = express();

app.use(express.urlencoded({extended: false}));

app.use(helmet());
app.use(express.json());
app.use(morgan('tiny'));



module.exports = app

