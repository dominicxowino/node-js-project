var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{type: String, minlength: 5},
    email:{type: String,required:true },
    phone:{type: String,required:true, minlength: 10,},
    password:{type: String, minlength: 5},
     isAdmin: {type: Boolean, default:false},

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);