const mongoose = require("mongoose")

const UserSchema =  new mongoose.Schema({
    name:{
        type:String,
    },

    email:{
        type:String,
        required:true,
        unique: true  //email should be unique for every user
    },

    password:{
        type: String,
        required:true,
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model("User", UserSchema);