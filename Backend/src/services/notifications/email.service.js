const nodemailer = require("nodemailer");
const { generateJobEmailTemplate } = require("./email.template");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL_ACCOUNT,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends job emails to multiple recipients.
 * @param {Object} job - The job object containing job details.
 * @param {Array} recipients - List of recipient emails.
 * @returns {Promise} - Result of the email sending process.
 */
exports.sendJobEmail = async (job, recipients) => {
  const emailContent = generateJobEmailTemplate(job);

  const mailOptions = {
    from: process.env.EMAIL_ACCOUNT,
    to: recipients, // Array of recipient emails
    subject: `New Job Posting: ${job.jobTitle}`,
    html: emailContent,
  };

  return transporter.sendMail(mailOptions);
};
