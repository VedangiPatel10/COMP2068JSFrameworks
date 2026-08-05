// Constants
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");

const connectDB = require("./config/db");
require("./config/passport")(passport);

const app = express();

// DataBase connection
connectDB();

// View engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
require("hbs").registerPartials(path.join(__dirname, "views", "partials"));

// Handlebars
const hbs = require("hbs");
hbs.registerHelper("eq", (a, b) => a === b);
hbs.registerHelper("formatPrice", (n) => `$${Number(n).toFixed(2)}`);

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method")); // lets HTML forms send PUT/DELETE
app.use(express.static(path.join(__dirname, "public")));

// Session, Passport, and Flash
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// View and Flash Messages Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user || null;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

