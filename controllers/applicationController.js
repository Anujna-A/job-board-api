const Application = require("../models/Application.js");
const Job = require("../models/Job.js")

const applyForJob = async (req,res) => {
    try{
        console.log('File:', req.file)
        console.log('Job ID from URL:', req.params.jobId)
        const job = await Job.findById(req.params.jobId);
        console.log('Job found:', job)
        if(!job){
            return res.status(400).json({message:"job not found"})
        }

        const existing = await Application.findOne({
            job:req.params.jobId,
            applicant:req.user.id
        })
        if(existing){
            return res.status(400).json({message:"application already exists"})
        }
        
        const resumeUrl = req.file ? req.file.path : '';

        const application = await Application.create({
            job:req.params.jobId,
            applicant:req.user.id,
            resumeUrl: resumeUrl
        })
        res.status(201).json({message:"job application submitted successfully", application})
    }catch(error){
        res.status(500).json({message: error.message})
    }
};

const getMyApplications = async (req,res)=>{
    try{
        console.log('getMyApplications hit!')  // add this
        console.log('User:', req.user)  
        const applications = await Application.find({applicant: req.user.id}).populate('job', 'title company location jobtype')
        res.status(200).json(applications)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getApplicationsForJob = async (req,res)=>{
    try{
        console.log('getApplicationsForJob hit!')  // add this
        console.log('Job ID:', req.params.jobId)  
        const job = await Job.findById(req.params.jobId)
        if(!job){
            return res.status(404).json({message:'job not found'})
        }

        if(job.postedby.toString() !== req.user.id){
            return res.status(404).json({message:'not authorized'})
        }

        const applications = await Application.find({job: req.params.jobId}).populate('applicant', 'name email')
        res.status(200).json(applications)
    }catch(error){
        res.status(500).json({message: error.message})
    }

}

const updateJobStatus = async (req,res)=>{
    try{
        const {status}= req.body

        const validatestatus = ['pending', 'reviewed', 'accepted', 'rejected']
        if(!validatestatus.includes(status)){
          return res.status(404).json({message:"status invalid"})
        }

        const application = await Application.findById(req.params.id).populate('job')
        if(!application){
            return res.status(404).json({message:'Application not found'})
        }
        if(application.job.postedby.toString() !== req.user.id){
            return res.status(404).json({message:"not authorized"})
        }
        application.status= status
        await application.save()

        res.status(200).json({message:'status updated succesfully', application})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports = {applyForJob, getMyApplications, getApplicationsForJob, updateJobStatus}