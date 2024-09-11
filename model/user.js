
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    name:String,
    passwordHash:String,
    createAt:{
        type:Date,
        default : Date.now
    },
    updateAt:Date,
    notes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Note'
        }
    ]
});


const User = mongoose.model('User',userSchema,'users');

module.exports = User;