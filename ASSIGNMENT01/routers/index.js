var express = require('express');
var router = express.Router();

// Home Page - giving the basic information about the website and the author
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Vedangi Patel | Home',
    page: 'home'
  });
});

// About Me Page - giving the information about the author
router.get('/about', function (req, res) {
  res.render('about', {
    title: 'Vedangi Patel | About Me',
    page: 'about'
  });
});

