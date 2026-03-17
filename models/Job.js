const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,       
    },
    jobtype:{
        type:String,
        enum:['full-time','part-time','contract','internship'],
        default:'full-time'
    },
    postedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
}, {
    timeStamps:true
})

module.exports = mongoose.models.Job || mongoose.model('Job', jobSchema);