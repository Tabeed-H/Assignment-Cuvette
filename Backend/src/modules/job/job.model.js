const mongoose = require("mongoose");

/**
 * Job Schema
 * This schema defines the structure of job postings.
 *
 * Fields:
 *  - jobTitle: The title of the job posting.
 *  - jobDescription: A detailed description of the job.
 *  - experienceLevel: The required experience level for the job.
 *  - postedBy: References the user who created the job posting.
 *  - candidates: List of email addresses to whom job emails can be sent.
 *  - endDate: The date the job posting will expire.
 */
const jobSchema = new mongoose.Schema(
  {
    isDeleted: { type: Boolean, default: false }, // Soft delete flag
    isVisible: { type: Boolean, default: true }, // Visibility of the job posting
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    experienceLevel: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the user who created the job
      ref: "User",
      required: true,
    },
    candidates: [
      {
        type: String, // List of email addresses for candidates
        trim: true,
      },
    ],
    endDate: {
      type: Date, // The end date of the job posting
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = Job = mongoose.model("Job", jobSchema);
