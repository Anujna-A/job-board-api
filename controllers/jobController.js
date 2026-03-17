const Job = require('../models/Job.js')

const createJob = async (req,res)=>{
    try{
        const {title, description, company, location, salary, jobtype}= req.body
        console.log('Request body:', req.body)
        console.log('User from token:', req.user)
        const job = await Job.create({
            title,
            description,
            company,
            location,
            salary,
            jobtype,
            postedby:req.user.id
        })
        console.log('Job saved:', job)
       return res.status(201).json({message:'job created sucessfully', job})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}

const getAllJobs = async (req,res)=>{
    try{
        const {location, jobtype, search}=req.query

        const query={}
        if(location) query.location = new RegExp(location, 'i')
            if(jobtype) query.jobtype = jobtype
        if(search) query.search = new RegExp(search, 'i')

            const jobs= await Job.find(query).populate('postedby', 'name email')

            res.status(200).json(jobs)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getJobbyId = async (req, res)=>{
    try{
        const job = await Job.findById(req.params.id).populate('postedby', 'name email')
        if(!job){
            return res.status(404).json({message:'job not found'})
        }
        res.status(200).json(job)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateJob = async (req,res)=>{
    try{
        const job = await Job.findById(req.params.id)
        if(!job){
            return res.status(404).json({message:'job not found'})
        }
        if(job.postedby.toString() !== req.user.id){
            return res.status(404).json({message:'not authorized to update the job'})
        }
        const updateJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json({message:'Job updated succesfully', updateJob})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteJob = async (req,res)=>{
    try{
        const job = await Job.findById(req.params.id)

        if(!job){
            return res.status(404).json({message:'job not found'})
        }

        if(job.postedby.toString() !== req.user.id){
            return res.status(404).json({message:'not authorized to delete job'})
        }

        await Job.findByIdAndDelete(req.params.id)

        res.status(200).json({message:'Job deleted succesfully'})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createJob, getAllJobs, getJobbyId, updateJob, deleteJob}