// mail.template.js

/**
 * Generates an HTML email template for OTP.
 * @param {String} otp - The OTP to include in the email.
 * @returns {String} - The HTML email template.
 */
function generateEmailTemplate(otp) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          max-width: 600px;
          margin: auto;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          text-align: center;
          padding-bottom: 20px;
          border-bottom: 1px solid #dddddd;
        }
        .email-header h1 {
          margin: 0;
          color: #333;
        }
        .email-body {
          padding-top: 20px;
          text-align: center;
        }
        .otp-code {
          display: inline-block;
          background-color: #4caf50;
          color: white;
          padding: 10px 20px;
          font-size: 20px;
          letter-spacing: 4px;
          margin-top: 10px;
          border-radius: 5px;
        }
        .email-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Email Verification</h1>
        </div>
        <div class="email-body">
          <p>Your OTP for email verification is:</p>
          <div class="otp-code">${otp}</div>
          <p>Please enter this OTP to verify your email address.</p>
        </div>
        <div class="email-footer">
          <p>If you did not request this, please ignore this email.</p>
        </div>
      </div>
    </body>
    </html>
    `;
}

module.exports = { generateEmailTemplate };
