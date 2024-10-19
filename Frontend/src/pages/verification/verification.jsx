import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { verifyEmailOtp, verifyPhoneOtp } from "../../../API/crudServices";
import { CheckCircle } from "lucide-react";
import logo from "@/assets/logo.png";

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
  const navigate = useNavigate();

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
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-white p-4 md:p-0">
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 bg-white shadow-md">
        <img src={logo} alt="Cuvette Logo" className="w-24 h-auto" />
        <div>Contact</div>
      </div>

      <div className="flex-1 hidden md:block p-4 md:pl-16">
        <h1 className="text-3xl font-semibold mb-4">Verify Your Account</h1>
        <p className="text-gray-500 max-w-lg">
          Please enter the OTP sent to your email and phone number to verify
          your account.
        </p>
      </div>

      <div className="w-full max-w-sm md:max-w-md p-8 border border-gray-300 rounded-lg shadow-md mt-20 md:mt-0 md:mr-5 mr-0">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          OTP Verification
        </h1>

        {/* Email OTP Verification Form */}
        <form className="space-y-6" onSubmit={handleVerifyEmailOTP}>
          <div>
            <label htmlFor="emailOTP" className="block font-medium">
              Email OTP
            </label>
            <input
              type="text"
              name="emailOTP"
              id="emailOTP"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              value={formData.emailOTP}
              onChange={handleChange}
              required
            />
            {!verificationStatus.emailVerified && (
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 text-white p-3 rounded-md"
                disabled={isSubmitting}
              >
                Verify Email OTP
              </button>
            )}
            {verificationStatus.emailVerified && (
              <div className="text-green-500 text-sm mt-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Verified
              </div>
            )}
            {errorMessage && !verificationStatus.emailVerified && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </form>

        {/* Phone OTP Verification Form */}
        <form className="space-y-6" onSubmit={handleVerifyPhoneOTP}>
          <div>
            <label htmlFor="phoneOTP" className="block font-medium">
              Phone OTP
            </label>
            <input
              type="text"
              name="phoneOTP"
              id="phoneOTP"
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
              value={formData.phoneOTP}
              onChange={handleChange}
              required
            />
            {!verificationStatus.phoneVerified && (
              <button
                type="submit"
                className="mt-2 w-full bg-blue-600 text-white p-3 rounded-md"
                disabled={isSubmitting}
              >
                Verify Phone OTP
              </button>
            )}
            {verificationStatus.phoneVerified && (
              <div className="text-green-500 text-sm mt-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Verified
              </div>
            )}
            {errorMessage && !verificationStatus.phoneVerified && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </form>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className={`mt-4 w-full p-3 rounded-md ${
              verificationStatus.emailVerified &&
              verificationStatus.phoneVerified
                ? "bg-blue-600 text-white cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
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
