var mongoose = require("mongoose");
var Auction= require("./models/auction");
var Bid   = require("./models/bid");

var data = [
    {
        name: "Ramtons Tv", 
        photo1: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/20621079_1109279299205043_1306109565569661872_n.jpg?oh=3d468a8e624bcc8723ff6fd36e062e81&oe=59F6A861",
        photo2: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo3: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo4: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo5: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitNunc turpis lacus, fermentum et convallis eu, rhoncus non dui. sit amet, . Mauris eu rutrum sapien. Phasellus facilisis erat in libero suscipit aliquet",
    },
    {
        name: "Sony Tv", 
        photo1: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/20638252_1109279432538363_1897443470289902000_n.jpg?oh=1b802a4ae6f0aa86a9ff554a65a8fb46&oe=5A38C65A",
        photo2: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo3: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo4: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo5: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitNunc turpis lacus, fermentum et convallis eu, rhoncus non dui. sit amet, . Mauris eu rutrum sapien. Phasellus facilisis erat in libero suscipit aliquet",
    },
    {
        name: "Samsung Tv ", 
        photo1: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/20664529_1109279382538368_8876258237498938821_n.jpg?oh=03a89872b672088f0a009f2a9c3497dc&oe=5A373A57",
        photo2: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo3: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo4: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo5: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitNunc turpis lacus, fermentum et convallis eu, rhoncus non dui. sit amet, . Mauris eu rutrum sapien. Phasellus facilisis erat in libero suscipit aliquet",
    },
     {
        name: "SkyWorth Tv ", 
        photo1: "https://scontent.fnbo2-1.fna.fbcdn.net/v/t1.0-9/20622273_1109279405871699_834678277180371414_n.jpg?oh=9985c74b08b76f6b4241b907cd1a4288&oe=59EC31D3",
        photo2: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo3: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo4: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        photo5: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elitNunc turpis lacus, fermentum et convallis eu, rhoncus non dui. sit amet, . Mauris eu rutrum sapien. Phasellus facilisis erat in libero suscipit aliquet.",
     },
];

function seedDB(){
   //Remove all auctions
   Auction.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed auctions!");
         //add a few auctions
        data.forEach(function(seed){
            Auction.create(seed, function(err, auction){
                if(err){
                    console.log(err);
                } else {
                    console.log("added an auction item");
                    //create a bid
                    Bid.create(
                        {
                            text: "100",
                            author: "Homer"
                        }, function(err, bid){
                            if(err){
                                console.log(err);
                            } else {
                                auction.bids.push(bid);
                                auction.save();
                                console.log("Created new bid");
                            }
                        });
                }
            });
        });
  }); 
    //add a few bids
}

module.exports = seedDB;
