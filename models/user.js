const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowerCase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    role:{
        type:String,
        enum:['jobseeker','recruiter'],
        default:'jobseeker'
    }
}, { timeStamps:true })

module.exports = mongoose.model('User', userSchema)