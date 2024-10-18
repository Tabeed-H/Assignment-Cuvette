const otpGenerator = require("otp-generator");
const User = require("../../modules/user/user.model");

const OTP_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Generates and stores an OTP for either email or phone verification.
 * @param {Object} user - The user object from the database.
 * @param {String} type - Either 'email' or 'phone' to specify the OTP type.
 * @returns {String} - The generated OTP.
 */
async function generateAndStoreOTP(user, type) {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
  const expiryTime = new Date(Date.now() + OTP_EXPIRATION_TIME);

  if (type === "email") {
    user.emailOTP = otp;
    user.emailOTPExpires = expiryTime;
  } else if (type === "phone") {
    user.phoneOTP = otp;
    user.phoneOTPExpires = expiryTime;
  }

  await user.save();
  return otp;
}

/**
 * Verifies the OTP entered by the user against the stored OTP.
 * @param {Object} user - The user object from the database.
 * @param {String} submittedOTP - The OTP entered by the user.
 * @param {String} type - Either 'email' or 'phone' to specify the OTP type.
 * @returns {Boolean} - Returns true if the OTP is valid, otherwise false.
 */
async function verifyOTP(user, submittedOTP, type) {
  const now = new Date();

  if (type === "email") {
    if (user.emailOTP === submittedOTP && user.emailOTPExpires > now) {
      user.isEmailVerified = true;
      user.emailOTP = undefined;
      user.emailOTPExpires = undefined;
      await user.save();
      return true;
    }
  } else if (type === "phone") {
    if (user.phoneOTP === submittedOTP && user.phoneOTPExpires > now) {
      user.isPhoneVerified = true;
      user.phoneOTP = undefined;
      user.phoneOTPExpires = undefined;
      await user.save();
      return true;
    }
  }

  return false; // OTP is invalid or expired
}

module.exports = { generateAndStoreOTP, verifyOTP };
