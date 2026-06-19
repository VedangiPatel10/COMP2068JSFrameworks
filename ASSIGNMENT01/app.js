var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs = require('hbs');

var indexRouter = require('./routers/index');

var app = express();

// View engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
