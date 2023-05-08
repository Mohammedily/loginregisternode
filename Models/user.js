const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        requried: true
    },
    password:{
        type:String,
        requried: true
    }
});


const user = new mongoose.model("User", userSchema);

module.exports = user;