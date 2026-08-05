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
