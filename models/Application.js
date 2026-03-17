const mongoose = require("mongoose")


const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    resumeUrl:{
        type:String,
        default:''
    },
    status:{
        type:String,
        enum:['pending','reviewed','accepted','rejected'],
        default:'pending'
    }
},{timeStamps: true});

module.exports = mongoose.model('Application', applicationSchema)