// Blocks access to private routes unless the user is logged in.

module.exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash("error_msg", "Please log in to view that page");
  res.redirect("/auth/login");
};