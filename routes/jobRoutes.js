const express = require("express")
const router = express.Router()
const {createJob, getAllJobs, getJobbyId, updateJob, deleteJob} = require("../controllers/jobController.js")
const {protect, recruiterOnly} = require('../middleware/authMiddleware')

router.get('/', getAllJobs)
router.get('/:id', getJobbyId)
router.post('/', protect, recruiterOnly, createJob)
router.put('/:id', protect, recruiterOnly, updateJob)
router.delete('/:id', protect, recruiterOnly, deleteJob)

module.exports = router