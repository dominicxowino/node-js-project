 

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
                    seedDB      = require("./seeds");
                    
                
               // var url = process.env.DATABASEURL || "mongodb://localhost/auction";
                mongoose.connect("mongodb://<dominicowino>:<databasepassword>@ds145223.mlab.com:45223/auction");
                //mongodb://<dbuser>:<dbpassword>@ds145223.mlab.com:45223/auction
                mongoose.connect("mongodb://localhost/yelp_camp_v10");
                app.use(bodyParser.urlencoded({extended: true}));
                app.set("view engine", "ejs");
                app.use(express.static(__dirname + "/public"));
                app.use(methodOverride("_method"));
                app.use(flash());
                //require moment
                app.locals.moment = require('moment');
                // seedDB();
                
                //requring routes
                var bidRoutes    = require("./routes/bids"),
                    auctionRoutes = require("./routes/auctions"),
                    indexRoutes      = require("./routes/index");
                    
                    app.locals.moment = require('moment');
             
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
               
                
                app.use("/", indexRoutes);
                app.use("/auctions", auctionRoutes);
                app.use("/auctions/:id/bids", bidRoutes);
                app.get('*', function(req, res) {
                    res.redirect('/');
                });
                
                
                
                app.listen(process.env.PORT, process.env.IP, function(){
                   console.log("The Server Has Started!");
                });