 //https://ide.c9.io/learnwithcolt/webdevbootcamp

                var express     = require("express"),
                    app         = express(),
                    bodyParser  = require("body-parser"),
                    mongoose    = require("mongoose"),
                    flash       = require("connect-flash"),
                    passport    = require("passport"),
                    LocalStrategy = require("passport-local"),
                    methodOverride = require("method-override"),
                    Auction  = require("./models/auction"),
                    Bid  = require("./models/bid"),
                    User        = require("./models/user"),
                    middleware = require("./middleware"),
                   
                    seedDB      = require("./seeds");
                   
    
               
                    //  var Mongoose = require('mongoose');
                   
                    //  Mongoose.connect(connectionUrl); 
                    // console.log( process.env.DATABASEURL);
                    var url = process.env.DATABASEURL || "mongodb://localhost/auction";
                                 mongoose.connect(url);

      
                         //mongoose.connect(process.env.DATABASEURL);
       
                app.use(bodyParser.urlencoded({extended: true}));
                app.use(bodyParser.json());
                app.set("view engine", "ejs");
                app.use(express.static(__dirname + "/public"));
                app.use(methodOverride("_method"));
                app.use(flash());
                //require moment
                app.locals.moment = require('moment');
                // seedDB();
                
                //requiring routes
                var bidRoutes    = require("./routes/bids"),
                    auctionRoutes = require("./routes/auctions"),
                   indexRoutes      = require("./routes/index");
                   
                // PASSPORT CONFIGURATION
                app.use(require("express-session")({
                    secret: "This is my secret!",
                    resave: false,
                    saveUninitialized: false
                }));
                app.use(passport.initialize());
                app.use(passport.session());
                passport.use(new LocalStrategy(User.authenticate()));
                passport.serializeUser(User.serializeUser());
                passport.deserializeUser(User.deserializeUser());
                
                
                 app.use(function(req, res, next){
                               res.locals.currentUser = req.user;
                               res.locals.error = req.flash("error");
                             res.locals.success = req.flash("success");
                               next();
                            });
              app.get('/admin/index',middleware.isLoggedIn, function (req, res) {
                User.find({}, function(err, allUsers){
                      if(err){
                          console.log(err);
                      } else {
                          res.render("admins/index",{users:allUsers});
                      }
                    });
                });
//NEW - show form to create new user 
app.get("/admin/new",middleware.isLoggedIn, function(req, res){
     res.render("admins/new"); 
});
                
                app.use("/", indexRoutes);
                app.use("/auctions", auctionRoutes);
              
                
                app.use("/auctions/:id/bids", bidRoutes);
                // app.get('*', function(req, res) {
                //     res.redirect('/');
                // });
                
                
                
                app.listen(process.env.PORT, process.env.IP, function(){
                   console.log("The Server Has Started!");
                });