

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username:{type: String, minlength: 5},
    phone:{type: String,required:true, minlength: 10,},
    email:{type: String,required:true },
    password:{type: String, minlength: 5},
    firstName:{type: String, minlength: 3},
    lastName:{type: String, minlength: 3},
    avatar:{type: String, },
    account:{type: String, },
    isAdmin: {type: Boolean, default:false},
    isSuperAdmin:{type: Boolean,default:false },

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);