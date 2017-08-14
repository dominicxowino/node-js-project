
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


//root route
router.get("/", function(req, res){
    res.render("landing");
});


//  ===========
// About page route
//  ===========
router.get("/about", function(req,res){
    res.render("about.ejs");
});
//  ===========
// AUTH ROUTES
//  ===========
// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, phone: req.body.phone, email: req.body.email});
    if(req.body.adminCode ==="secretcode12345forsoap"){
       newUser.isAdmin =true;
   }
    User.register(newUser, req.body.password, function(err, user){
     if(err){
         console.log(err);
  req.flash("error", err.message);
  return res.redirect("/register");
}
          
        passport.authenticate("local")(req, res, function(){
             req.flash("success", "Welcome to Dukamall Auction Bay " + user.username);
           res.redirect("/auctions"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});
// handling login logic
router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   successFlash: 'Welcome to DukaMall Auction Bay!',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged You Out Successfully!");
   res.redirect("/");
});




module.exports = router;
