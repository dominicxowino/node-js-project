

var mongoose = require("mongoose");

var auctionSchema = new mongoose.Schema({
    name: String,
    price: String,
    photo1: String,
    photo2: String,
    photo3: String,
    photo4: String,
    photo5: String,
    description: String,
    createdAt:{ type:Date, default:Date.now},
    
    author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
    
   bids: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Bid"
      }
   ]
});

module.exports = mongoose.model("Auction", auctionSchema);