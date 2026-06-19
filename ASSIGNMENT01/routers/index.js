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

// Projects Page - giving the information about the projects done by the author
router.get('/projects', function (req, res) {
  res.render('projects', {
    title: 'Vedangi Patel | Projects',
    page: 'projects'
  });
});

// Contact Me Page - giving the information about how to contact the author
router.get('/contact', function (req, res) {
  res.render('contact', {
    title: 'Vedangi Patel | Contact Me',
    page: 'contact'
  });
});


// Handle Contact 
router.post('/contact', function (req, res) {
  const { name, email, message } = req.body;
  res.render('contact', {
    title: 'Vedangi Patel | Contact Me',
    page: 'contact',
    success: true,
    senderName: name
  });
});

module.exports = router;

