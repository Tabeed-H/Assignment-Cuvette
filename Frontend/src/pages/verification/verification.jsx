import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

import {
  sendEmailOtp,
  sendPhoneOtp,
  verifyEmailOtp,
  verifyPhoneOtp,
} from "../../../API/crudServices";

const Verification = () => {
  const [formData, setFormData] = useState({
    emailOTP: "",
    phoneOTP: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState({
    emailVerified: false,
    phoneVerified: false,
  });
  const token = useAuthHeader();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleVerifyEmailOTP = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await verifyEmailOtp(formData.emailOTP, token);
      if (response.error) {
        setErrorMessage(response.error);
        setVerificationStatus((prev) => ({ ...prev, emailVerified: false }));
        return;
      }

      // Mark email as verified
      setVerificationStatus((prev) => ({ ...prev, emailVerified: true }));
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "An error occurred while verifying email OTP. Please try again."
      );
      setVerificationStatus((prev) => ({ ...prev, emailVerified: false }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyPhoneOTP = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await verifyPhoneOtp(formData.phoneOTP, token);
      if (response.error) {
        setErrorMessage(response.error);
        setVerificationStatus((prev) => ({ ...prev, phoneVerified: false }));
        return;
      }

      // Mark phone as verified
      setVerificationStatus((prev) => ({ ...prev, phoneVerified: true }));
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "An error occurred while verifying phone OTP. Please try again."
      );
      setVerificationStatus((prev) => ({ ...prev, phoneVerified: false }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContinue = () => {
    // Navigate to the dashboard
    console.log("Navigating to dashboard...");
    // Use your navigation logic here
  };

  return (
    <div className="signup-container flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Verify Your Account
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleVerifyEmailOTP}>
          <div>
            <label
              htmlFor="emailOTP"
              className="block text-sm font-medium text-gray-700"
            >
              Email OTP
            </label>
            <input
              type="text"
              name="emailOTP"
              id="emailOTP"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.emailOTP}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-blue-500 text-white font-medium p-2 hover:bg-blue-600"
              disabled={isSubmitting}
            >
              Verify Email OTP
            </button>
            {verificationStatus.emailVerified && (
              <span className="text-green-500">✔️ Verified</span>
            )}
            {errorMessage && !verificationStatus.emailVerified && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </form>

        <form className="space-y-6" onSubmit={handleVerifyPhoneOTP}>
          <div>
            <label
              htmlFor="phoneOTP"
              className="block text-sm font-medium text-gray-700"
            >
              Phone OTP
            </label>
            <input
              type="text"
              name="phoneOTP"
              id="phoneOTP"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={formData.phoneOTP}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-blue-500 text-white font-medium p-2 hover:bg-blue-600"
              disabled={isSubmitting}
            >
              Verify Phone OTP
            </button>
            {verificationStatus.phoneVerified && (
              <span className="text-green-500">✔️ Verified</span>
            )}
            {errorMessage && !verificationStatus.phoneVerified && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </form>

        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="mt-4 w-full rounded-md bg-blue-500 text-white font-medium p-2 hover:bg-blue-600"
            disabled={
              !verificationStatus.emailVerified ||
              !verificationStatus.phoneVerified
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verification;
