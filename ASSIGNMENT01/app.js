var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');

var indexRouter = require('./routers/index');

var app = express();

// View engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register partials like header and footer
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

