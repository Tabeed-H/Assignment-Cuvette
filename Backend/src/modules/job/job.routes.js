const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); // Auth middleware to verify JWT
const jobService = require("../job/job.service");

// Create a job (only verified users)
router.post("/create", auth, jobService.createJob);

// Get jobs created by the logged-in user
router.get("/my-jobs", auth, jobService.getMyJobs);

// Send job emails to multiple recipients
router.post("/send-job-emails", auth, jobService.sendJobEmails);

module.exports = router;
