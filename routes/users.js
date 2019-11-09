

// same as previous pages / no lesson here
const express = require("express");
const router = express.Router();

// bring in the encryption for when a user isnt already registered.
const bcrypt = require("bcryptjs");

// bring in the user/schema model from bottom of user.js in order to
//  be able to call methods on user.
const User = require("../models/User");



//  login Page
// GET and SEND/RENDER a msg for testing
// router.get("/login", (req, res) => res.send("login on this page"));
router.get("/login", (req, res) => res.render("login"));


//  register Page
// GET and SEND/RENDER a msg for testing
// router.get("/register", (req, res) => res.send("register on this page"));
router.get("/register", (req, res) => res.render("register"));


// register handle/path
router.post("/register", (req, res) => {

  const { name, email, password, password2 } = req.body;
  // forcing Authentications (I chose these lines because 
  // they were beautiful and I understood them curtesy of Brad Traversy)
  // define errors as an array with the following potentials
  let errors = [];
    // checking required fields
  if (!name || !email || !password || !password2) {
      errors.push ({msg: "Please Fill In All Fields"});
    }
    // checking that passwords match
    if (password !== password2) {
      errors.push ({msg: "Passwords Do Not Match"});
    }
    // checking password lengths
    if (password.length < 6) {
      errors.push ({msg: "Password should be at least 6 charachters"});
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      // // for testing purposes send a pass confirmation
      // res.send("pass");

  // WHEN VALIDATION HAS PASSED:
  // we need to ensure the user doesnt already exist 
  // using the find one method. Which returns a promise.
    User.findOne({ email: email })
    // since the method returns a promise we use it to compare.
      .then(user => {
        if(user) {
      // since/if the user exists:
          errors.push ({msg: "Email Is Already Registered"});
          res.render("register", {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });


          console.log(newUser);
          res.send("hello");
        

        }
      });
    }
  // console.log(req.body);
  // res.send("hello");
});

// send this out
module.exports = router;



