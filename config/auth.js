
// To protect a page from entrance without login/registration
module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please Log-In To View This Page");
    res.redirect("/users/login");
  }
}