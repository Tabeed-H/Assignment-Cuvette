const router = require("express").Router();
const auth = require("../../middleware/auth"); // Middleware to protect routes
const _userService = require("../user/user.service");

// Authentication Routes
router.post("/signup", _userService.doSignup); // User Signup
router.post("/login", _userService.doLogin); // User Login
router.get("/:_id", auth, _userService.doGetUserById); // Get User by ID (protected)

// Verification Routes
router.post("/send-email-otp", auth, _userService.sendEmailVerificationOTP); // Send OTP for email verification
router.post("/verify-email-otp", auth, _userService.verifyEmailOTP); // Verify email OTP
router.post("/send-phone-otp", auth, _userService.sendSmsVerificationOTP); // Send OTP for phone verification
router.post("/verify-phone-otp", auth, _userService.verifySmsOTP); // Verify phone OTP

// Logout
router.post("/logout", auth, _userService.doLogout); // Logout the user by invalidating the JWT token

module.exports = router;
