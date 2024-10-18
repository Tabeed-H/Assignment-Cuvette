const Job = require("./job.model");
const User = require("../user/user.model");
const emailService = require("../../services/notifications/email.service");
const _response = require("../../middleware/responseHandler");

/**
 * Create a Job Posting
 * Only verified users can create job postings.
 * @param {Object} req - The request object containing job details.
 * @returns {Object} - The created job posting.
 */
exports.createJob = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // Ensure user is verified (both email and phone)
    if (!user.isEmailVerified || !user.isPhoneVerified) {
      const response = await _response.generateResponse(
        [],
        null,
        403,
        "User is not verified to post jobs.",
        true
      );
      return res.status(response.status).send(response);
    }

    // Create the job
    const job = new Job({
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      experienceLevel: req.body.experienceLevel,
      endDate: new Date(req.body.endDate).toISOString(),
      candidates: req.body.candidates,
      postedBy: user._id, // Store the user who posted this job
    });

    const result = await job.save();

    const response = await _response.generateResponse(
      result,
      null,
      201,
      "Job created successfully.",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};

/**
 * Fetch All Jobs Created by the Logged-in User
 * @param {Object} req - The request object.
 * @returns {Array} - List of jobs created by the user.
 */
exports.getMyJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id, isDeleted: false });

    if (!jobs.length) {
      const response = await _response.generateResponse(
        [],
        null,
        404,
        "No jobs found.",
        true
      );
      return res.status(response.status).send(response);
    }

    const response = await _response.generateResponse(
      jobs,
      null,
      200,
      "Jobs fetched successfully.",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};

/**
 * Send Emails to Multiple Recipients About the Job
 * @param {Object} req - The request object containing job and recipient details.
 * @returns {Object} - Success or failure message.
 */
exports.sendJobEmails = async (req, res, next) => {
  try {
    const job = await Job.findById(req.body.jobId).populate(
      "postedBy",
      "name email companyName"
    );

    if (!job) {
      const response = await _response.generateResponse(
        [],
        null,
        403,
        "You are not authorized to send this job.",
        true
      );
      return res.status(response.status).send(response);
    }

    const recipients = job.candidates; // Array of recipient emails

    await emailService.sendJobEmail(job, recipients);

    const response = await _response.generateResponse(
      [],
      null,
      200,
      "Emails sent successfully.",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};
