
var mongoose = require("mongoose");

var bidSchema = mongoose.Schema({
    price: {type: String,required:true, minlength:3,},
    createdAt:{ type:Date, default:Date.now},
   author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Bid",bidSchema);