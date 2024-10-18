const Mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * User Schema
 */
const userSchema = new Mongoose.Schema(
  {
    // To store jwt tokens
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    isDeleted: { type: Boolean, default: false }, // To soft delete the user
    isEmailVerified: { type: Boolean, default: false }, // Tracks if email is verified
    isPhoneVerified: { type: Boolean, default: false }, // Tracks if phone number is verified

    // fields for email and phone verification
    emailOTP: {
      type: String,
      required: false, // OTP used for email verification
    },
    phoneOTP: {
      type: String,
      required: false, // OTP used for phone verification
    },
    emailOTPExpires: {
      type: Date, // Expiry time for email OTP
      required: false,
    },
    phoneOTPExpires: {
      type: Date, // Expiry time for phone OTP
      required: false,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true, // Enforces unique email for each user
      required: true,
      trim: true,
      lowercase: true, // Ensures email is stored in lowercase
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid."); // Validates if the email format is correct
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length of 6 characters
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"'); // Ensures the password doesn't include the word "password"
        }
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// ********** RETURN THE USER OBJECT WITHOUT SENSITIVE DATA **********
/**
 * toJSON method:
 * This method is automatically called when a user object is returned.
 * It ensures that sensitive data (password, tokens, OTPs) is not exposed.
 * @returns {Object} - User object without sensitive fields.
 */
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password; // Remove password from the object
  delete userObject.tokens; // Remove JWT tokens from the object
  delete userObject.emailOTP; // Remove email OTP from the object
  delete userObject.phoneOTP; // Remove phone OTP from the object
  delete userObject.emailOTPExpires; // Remove email OTP expiry from the object
  delete userObject.phoneOTPExpires; // Remove phone OTP expiry from the object
  return userObject;
};

// ********** GENERATE AUTH TOKEN WHEN USER LOGSIN OR SIGNSUP **********
/**
 * generateAuthToken method:
 * Generates a JWT token for the user when they log in or sign up.
 * The token contains the user's ID and role, and it expires in 24 hours.
 * @returns {String} - The generated JWT token.
 */
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id }, // Payload includes user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    {
      expiresIn: 24 * 60 * 60, // Token expires in 24 hours
    }
  );

  user.tokens = user.tokens.concat({ token }); // Append the new token to the tokens array
  await user.save(); // Save the user object with the updated token array
  return token;
};

// ********** AUTHENTICATE THE USER FROM DATABASE **********
/**
 * findByCredentials static method:
 * Finds a user by email and compares the provided password with the stored hash.
 * Throws an error if authentication fails.
 * @param {String} email - User's email
 * @param {String} password - User's plain text password
 * @returns {Object} - The authenticated user object if credentials are valid.
 */
userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      throw new Error(404); // User not found
    }
    const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
    if (!isMatch) {
      throw new Error(406); // Password mismatch
    }
    return user; // Return the authenticated user
  } catch (err) {
    return 500; // Internal server error
  }
};

// ********** HASH PASSWORDS BEFORE SAVING THE DATA **********
/**
 * Middleware: pre-save hook
 * This middleware hashes the user's password before saving the user to the database.
 * It only runs if the password field is modified.
 * @param {Function} next - Callback to pass control to the next middleware.
 */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    // Hash the password only if it is modified (during registration or password change)
    user.password = await bcrypt.hash(
      user.password,
      parseInt(process.env.ROUNDS)
    ); // Hash the password with the specified salt rounds
  }
  next(); // Continue to the next middleware or save operation
});

module.exports = User = Mongoose.model("User", userSchema); // Export the User model
