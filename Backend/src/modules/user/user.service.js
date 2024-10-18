const User = require("../user/user.model");
const validate = require("../../helpers/helper");
const _response = require("../../middleware/responseHandler");
const otpService = require("../../services/verification/otp.service");
const emailService = require("../../services/verification/email.service");
const smsService = require("../../services/verification/sms.service");

exports.doSignup = async (req, res, next) => {
  try {
    let response = "";
    const check = await validate.checkBody(req.body);
    if (!check) {
      response = await _response.generateResponse(
        [],
        "",
        404,
        "Body is invalid",
        true
      );
      return res.status(response.status).send(response);
    }
    const user = new User(req.body);
    const result = await user.save();
    if (!result) {
      response = await _response.generateResponse(
        [],
        "",
        500,
        "Something went Wrong",
        true
      );
      return res.status(response.status).send(response);
    }

    response = await _response.generateResponse(
      result,
      "",
      200,
      "User Created",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};

exports.doLogin = async (req, res, next) => {
  try {
    let response = "";
    const check = await validate.checkBody(req.body);
    if (!check) {
      response = await _response.generateResponse(
        [],
        "",
        404,
        "Body is invalid",
        true
      );
      return res.status(response.status).send(response);
    }
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (user == 406) {
      response = await _response.generateResponse(
        [],
        "",
        404,
        "No Such User Found...",
        true
      );
      return res.status(response.status).send(response);
    }
    if (user == 404) {
      response = await _response.generateResponse(
        [],
        "",
        406,
        "Password or Email is incorrect",
        true
      );
      return res.status(response.status).send(response);
    }
    if (user == 500) {
      response = await _response.generateResponse(
        [],
        "",
        500,
        "Something went wrong. Please try again",
        true
      );
      return res.status(response.status).send(response);
    }

    let token = await user.generateAuthToken();
    response = await _response.generateResponse(
      user,
      token,
      200,
      "Logged in Successfully",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};

exports.doGetUserById = async (req, res, next) => {
  try {
    let response = "";
    const { _id } = req.params;
    if (!_id) {
      response = await _response.generateResponse([], "", 404, "Id is invalid");
      return res.status(response.status).send(response);
    }
    const user = await User.findById({ _id });
    if (!user) {
      response = await _response.generateResponse(
        [],
        "",
        404,
        "No Such User Found",
        true
      );
      return res.status(response.status).send(response);
    }

    response = await _response.generateResponse(
      user,
      req.token,
      200,
      "User Fetched Successfully",
      false
    );
    return res.status(response.status).send(response);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller to handle sending OTP for email verification.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.sendEmailVerificationOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Fetch the logged-in user
    const otp = await otpService.generateAndStoreOTP(user, "email"); // Generate OTP

    const result = await emailService.sendEmailOTP(user, otp); // Send OTP via email

    const response = await _response.generateResponse(
      [],
      "",
      200,
      "OTP sent to email.",
      false
    );
    return res.status(response.status).send(response);
  } catch (error) {
    const response = await _response.generateResponse(
      [],
      "",
      500,
      "Failed to send OTP.",
      true
    );
    return res.status(response.status).send(response);
  }
};

/**
 * Controller to handle verifying OTP for email.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.verifyEmailOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const isValid = await otpService.verifyOTP(user, req.body.otp, "email"); // Verify OTP

    if (!isValid) {
      const response = await _response.generateResponse(
        [],
        "",
        400,
        "Invalid or expired OTP.",
        true
      );
      return res.status(response.status).send(response);
    }

    const response = await _response.generateResponse(
      [],
      "",
      200,
      "Email verified successfully.",
      false
    );
    return res.status(response.status).send(response);
  } catch (error) {
    const response = await _response.generateResponse(
      [],
      "",
      500,
      "OTP verification failed.",
      true
    );
    return res.status(response.status).send(response);
  }
};

/**
 * Controller to handle sending OTP for SMS verification.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.sendSmsVerificationOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Fetch the logged-in user
    const otp = await otpService.generateAndStoreOTP(user, "phone"); // Generate OTP

    const result = await smsService.sendSmsOTP(user, otp);

    const response = await _response.generateResponse(
      [],
      "",
      200,
      "OTP sent to Phone.",
      false
    );
    return res.status(response.status).send(response);
  } catch (error) {
    const response = await _response.generateResponse(
      [],
      "",
      500,
      "Failed to send OTP.",
      true
    );
    return res.status(response.status).send(response);
  }
};

/**
 * Controller to handle verifying OTP for SMS.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
exports.verifySmsOTP = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const isValid = await otpService.verifyOTP(user, req.body.otp, "phone"); // Verify OTP

    if (!isValid) {
      const response = await _response.generateResponse(
        [],
        "",
        400,
        "Invalid or expired OTP.",
        true
      );
      return res.status(response.status).send(response);
    }

    const response = await _response.generateResponse(
      [],
      "",
      200,
      "Phone verified successfully.",
      false
    );
    return res.status(response.status).send(response);
  } catch (error) {
    const response = await _response.generateResponse(
      [],
      "",
      500,
      "OTP verification failed.",
      true
    );
    return res.status(response.status).send(response);
  }
};

exports.doLogout = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    // Remove the token from the user's tokens array
    user.tokens = user.tokens.filter((token) => token.token !== req.token);

    // Save the updated user document
    await user.save();

    // Send a response indicating successful logout
    res.status(200).send({ message: "Logged out successfully." });
  } catch (error) {
    next(error); // Handle any errors that may occur
  }
};
