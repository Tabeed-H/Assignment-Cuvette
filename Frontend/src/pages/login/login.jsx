import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useNavigate } from "react-router-dom";

import {
  loginUser,
  sendEmailOtp,
  sendPhoneOtp,
} from "../../../API/crudServices.js";
import logo from "@/assets/logo.png";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const signIn = useSignIn();
  const authUser = useAuthUser();
  const token = useAuthHeader();
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await loginUser(data);
      localStorage.auth_token = "";
      signIn({
        auth: {
          token: result.data.token,
          type: "Bearer",
        },
        userState: {
          id: result.data.data._id,
        },
      });
      setSuccess("Login successful! Redirecting...");
      if (
        !result.data.data.isEmailVerified ||
        !result.data.data.isPhoneVerified
      ) {
        // console.log(token);
        await sendEmailOtp(null, result.data.token);
        await sendPhoneOtp(null, result.data.token);
        navigate("/verify");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-white p-4 md:p-0">
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 bg-white shadow-md">
        <img src={logo} alt="Cuvette Logo" className="w-24 h-auto" />
        <div>Contact</div>
      </div>

      <div className="flex-1 hidden md:block p-4 md:pl-16">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Cuvette</h1>
        <p className="text-gray-500 max-w-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="w-full max-w-sm md:max-w-md p-8 border border-gray-300 rounded-lg shadow-md mt-20 md:mt-0 md:mr-5 mr-0">
        <h1 className="text-2xl font-semibold mb-2 text-center">Log in</h1>
        <p className="text-gray-500 text-center mb-6">
          Lorem Ipsum is simply dummy text or
          <span className="font-bold pointer" onClick={handleSignup}>
            Sign up
          </span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              {...register("email", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">Email is required</span>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">Password is required</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed"}
          </button>

          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-2 text-center">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
