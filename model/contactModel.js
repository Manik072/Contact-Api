const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User',
    },
    
    ContactName:{
        type:String,
        required:true,
    },

    ContactNumber:{
        type:Number,
        required:true,
    }
}
,{
    timestamps: true,
});

module.exports = mongoose.model("Contact",ContactSchema)  