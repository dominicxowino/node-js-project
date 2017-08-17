var express = require("express");
var router  = express.Router();
var Auction = require("../models/auction");
var middleware = require("../middleware");


//INDEX - show all Item auctions
router.get("/", function(req, res){
  if(req.query.search){
      
  } else{
// Get all auction items from DB
   Auction.find({}, function(err, allAuctions){
       if(err){
           console.log(err);
       } else {
          res.render("auctions/index",{auctions:allAuctions});
       }
    });
  }
});

//CREATE - add new auction item to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to auction items array
    var name = req.body.name;
    var photo1 = req.body.photo1;
     var photo2 = req.body.photo2;
      var photo3 = req.body.photo3;
       var photo4 = req.body.photo4;
        var photo5 = req.body.photo5;
        var price= req.body.price;
        var __v = req.body.__v;
    var desc = req.body.description;
     var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newAuction = {name:name,price:price,author:author,bidn:__v, photo1:photo1, photo2:photo2, photo3:photo3,photo4: photo4, photo5: photo5, description: desc};
    // Create a new auction item and save to DB
    Auction.create(newAuction, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to all auction items page
            res.redirect("/auctions");
        }
    });
});

//NEW - show form to create new auction item
router.get("/new",middleware.isLoggedIn, function(req, res){
     req.flash("error", "YOU NEED TO BE LOGGED IN!");
   res.render("auctions/new"); 
});

// SHOW - shows more info about one auction item
router.get("/:id", function(req, res){
    //find the auction with provided ID
    Auction.findById(req.params.id).populate("bids").exec(function(err, foundAuction){
        if(err){
            console.log(err);
        } else {
            console.log(foundAuction);
            //render show template with that auction item
            res.render("auctions/show", {auction: foundAuction});
        }
    });
});


// Edit auction item route
router.get("/:id/edit", middleware.checkAuctionOwnership, function(req, res){
    Auction.findById(req.params.id, function(err, foundAuction){
        if(err)
       { console.log(err);}
        
        else{
         res.render("auctions/edit", {auction: foundAuction});}
    });
});

// UPDATE AUCTION ROUTE
router.put("/:id",middleware.checkAuctionOwnership, function(req, res){
    // find and update the correct auction item
   Auction.findByIdAndUpdate(req.params.id, req.body.auction, function(err, updatedAuction){
       if(err){
           res.redirect("/auctions");
       } else {
           req.flash("success", "Successfully Updated " + req.params.id );
           //redirect somewhere(show page)
           res.redirect("/auctions/" + req.params.id);
       }
    });
});

// Destroy Auction item route
router.delete("/:id",middleware.checkAuctionOwnership, function(req, res){
   Auction.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/auctions");
      } else {
           req.flash("success", "Successfully Deleted!");
          res.redirect("/auctions");
      }
   });
});



module.exports = router;
