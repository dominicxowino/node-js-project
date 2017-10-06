var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/users", function(req, res){
 
// Get all auction items from DB
   User.find({}, function(err, allUsers){
       if(err){
           console.log(err);
       } else {
          res.render("admin/users/index",{users:allUsers});
       }
    });
  }
});


module.exports = router;