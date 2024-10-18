const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function sendSmsOTP(user, otp) {
  client.messages
    .create({
      body: "OTP verification code for assignment is : " + otp,
      from: process.env.TWILIO_NUMBER,
      to: user.phone,
    })
    .then((message) => console.log(message.sid));
}

module.exports = { sendSmsOTP };
