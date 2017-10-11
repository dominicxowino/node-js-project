"use strict";
var express = require("express");
var router  = express.Router();
var Auction = require("../models/auction");
var middleware = require("../middleware");


//INDEX - show all Item auctions
// router.get("/", function(req, res){
//   if(req.query.search){
      
//   } else{
// // Get all auction items from DB
//   Auction.find({}, function(err, allAuctions){
//       if(err){
//           console.log(err);
//       } else {
//           //good now we go to line 128
//           res.status(200).json({
//               auctions: allAuctions
//           });
//         //   res.render("auctions/index",{auctions:allAuctions});
//       }
//     });
//   }
// });
//OK
//CREATE - add new auction item to DB
router.post("/",middleware.isLoggedIn, function(req, res){
    // get data from form and add to auction items array
    var name = req.body.name;
      var status= req.body.status;
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
    var newAuction = {name:name,price:price,author:author,bidn:__v, status:status, photo1:photo1, photo2:photo2, photo3:photo3,photo4: photo4, photo5: photo5, description: desc};
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
    var sort = { name: 1 };
    Auction.findById(req.params.id).populate("bids").sort(sort).exec(function(err, foundAuction){
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

let perPage = 30;
let page = 1;
let value = -1;
let output = {
  data: null,
  pages: {
    current: page,
    prev: 0,
    hasPrev: false,
    next: 0,
    hasNext: false,
    total: 0
  },
  items: {
    begin: ((page * perPage) - perPage) + 1,
    end: page * perPage,
    total: 0
  }
};

function init(req, res, next) {
  if (req.query && req.query.perPage) {
    perPage = parseInt(req.query.perPage, 10);
  }
  if (req.query && req.query.page) {
    page = parseInt(req.query.page, 10);
  }
  if (req.query && req.query.value) {
    value = parseInt(req.query.value, 10);
  }
}
 
function setOutput(auctions, count) {
  output.items.total = count;
  output.data = auctions;
  output.pages.total = Math.ceil(output.items.total / perPage);
  output.pages.current = page;
  if(output.pages.current < output.pages.total) {
    output.pages.next = Number(output.pages.current) + 1;
  } else {
    output.pages.next = 0;
  }
  output.pages.hasNext = (output.pages.next !== 0);
  output.pages.prev = output.pages.current - 1;
  output.pages.hasPrev = (output.pages.prev !== 0);
  if (output.items.end > output.items.total) {
    output.items.end = output.items.total;
  }
}
function paginate(req, res, next) {
  init(req, res);
  
    Auction
    .find()
    .sort({"created": value})
    .skip((page - 1) * perPage)
    .limit(perPage)
    .exec(function(err, auctions) {
      if(err) return next(err);
      Auction.count().exec(function(err, count) {
        if(err) return res.status(500).json(err);
        setOutput(auctions, count);
        console.log(output);
        res.render("auctions/index.ejs", {
          auctions: output.data,
          pages: output.pages,
          items: output.items
        });
      });
    });
}
 
router.get('/', function(req,res,next){
     paginate(req,res,next);
 });

// function paginate(req, res, next){
//   var perPage = 12;
//   var page = req.params.page;
//   Auction
//   .find({})
//   .skip(perPage * page)
//   .limit(perPage)
//   .exec(function(err,allAuctions){
      
//     if(err) return next(err.message);
//     Auction.count().exec(function(err,count){
//         if(err) return next(err.message);
//         res.render('auctions/index',{
//         auctions: allAuctions,
//         pages:count/perPage
//         });
//     });
// });
//  }   
// router.get('/', function(req,res,next){
//      paginate(req,res,next);
//  });
     
//  router.get('/page/:page', function(req,res,next){
     
//     paginate(req,res,next);
//  });

module.exports = router;
