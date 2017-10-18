
var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Auction = require("../models/auction");

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

router.get("/signup", function(req,res){
    res.render("signup.ejs");
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
    var newUser = new User({
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar,
    account: req.body.account,
   
    });
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
             req.flash("success", "Welcome to Auctionke.com " + user.username);
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
  passport.authenticate('local', { successRedirect: '/auctions',
                                   successFlash: 'Welcome to DukaMall Auction Bay!',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "Logged You Out Successfully!");
   res.redirect("/auctions");
});

//USERS PROFILE
router.get("/users/:id", function(req,res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error","Something went wrong.");
            res.redirect("/");
        }
Auction.find().where('author.id').equals(foundUser._id).exec(function(err,auctions){
         if(err){
            req.flash("error","Something went wrong.");
             res.redirect("/");
        }
        res.render("users/show", {user: foundUser, auctions: auctions});
        });
    });
});


module.exports = router;
