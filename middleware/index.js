var Auction= require("../models/auction");
var Bid= require("../models/bid");


// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkAuctionOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Auction.findById(req.params.id, function(err, foundAuction){
           if(err){
               req.flash("error", "Auction not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundAuction.author.id.equals(req.user._id)|| req.user.isAdmin) {
                next();
            } else {
                req.flash("error", "YOU NEED TO BE LOGGED IN");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be LOGGED IN and with BID NUMBER to bid");
        res.redirect("back");
    }
};

middlewareObj.checkBidOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Bid.findById(req.params.bid_id, function(err, foundBid){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundBid.author.id.equals(req.user._id)||req.user.isAdmin) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};

module.exports = middlewareObj;