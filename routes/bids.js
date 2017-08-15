var express = require("express");
var router  = express.Router({mergeParams: true});
var Auction = require("../models/auction");
var Bid = require("../models/bid");
var middleware = require("../middleware");


// ====================
// BID ROUTES
// ====================

router.get("/new",middleware.isLoggedIn, function(req, res){
    // find auction item by id
    Auction.findById(req.params.id, function(err, auction){
        if(err){
            console.log(err);
        } else {
             res.render("bids/new", {auction: auction});
        }
    });
});

router.post("/",middleware.isLoggedIn, function(req, res){
   //lookup auction item using ID
   Auction.findById(req.params.id, function(err, auction){
       if(err){
           console.log(err);
           res.redirect("/auctions");
       } else {
       Bid.create(req.body.bid, function(err, bid){
           if(err){
               req.flash("error", "Something went wrong!");
               console.log(err);
           } else {
               //add username and id to bid
              bid.author.id = req.user._id;
               bid.author.username = req.user.username;
               //save bid
                 bid.save();
               
               auction.bids.push(bid);
               auction.save();
                req.flash("success", "Successfully Added Your Bid");
               res.redirect('/auctions/' + auction._id);
           }
        });
       }
   });
  });

//Bids edit route
router.get("/:bid_id/edit", middleware.checkBidOwnership, function(req, res){
   Bid.findById(req.params.bid_id, function(err, foundBid){
      if(err){
          res.redirect("back");
      } else {
        res.render("bids/edit", {auction_id: req.params.id, bid: foundBid});
      }
   });
});



// Bid update
router.put("/:bid_id", middleware.checkBidOwnership, function(req, res){
   Bid.findByIdAndUpdate(req.params.bid_id, req.body.bid, function(err, updatedBid){
      if(err){
          res.redirect("back");
      } else { req.flash("success", "Successfully Updated!");
          res.redirect("/auctions/" + req.params.id );
      }
   });
});

// Bid delete route
router.delete("/:bid_id", middleware.checkBidOwnership, function(req, res){
    //findByIdAndRemove
    Bid.findByIdAndRemove(req.params.bid_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Successfully Deleted Your Bid!");
           res.redirect("/auctions/" + req.params.id);
       }
    });
});


module.exports = router;