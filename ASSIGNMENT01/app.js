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

// Routes
app.use('/', indexRouter);

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Vedangi's Portfolio running on port ${PORT}`);
});

module.exports = app;