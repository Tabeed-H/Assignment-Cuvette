const nodemailer = require("nodemailer");
const { generateEmailTemplate } = require("./email.template");

/**
 * Sends the OTP via email to the user.
 * @param {Object} user - The user object from the database.
 * @param {String} otp - The OTP to send to the user.
 */
async function sendEmailOTP(user, otp) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASS,
    },
  });

  const _HTML = generateEmailTemplate(otp);

  const infor = await transporter.sendMail({
    from: process.env.EMAIL_ACCOUNT,
    to: user.email,
    subject: "Email Verification OTP",
    html: _HTML,
  });
}

module.exports = { sendEmailOTP };
