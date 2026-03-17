const express = require("express");
const router = express.Router();
const {applyForJob, getMyApplications, getApplicationsForJob, updateJobStatus} = require("../controllers/applicationController.js")
const {protect, recruiterOnly} = require("../middleware/authMiddleware.js")
const upload = require("../middleware/uploadMiddleWare.js")

router.get('/my', protect, getMyApplications)
router.get('/jobs/:jobId', protect, recruiterOnly, getApplicationsForJob)
router.post('/:jobId', protect, upload.single('resume'), applyForJob);
router.patch('/:id/status', protect, recruiterOnly, updateJobStatus)

module.exports = router