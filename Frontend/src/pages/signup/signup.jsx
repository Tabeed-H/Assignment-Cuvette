import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { doSignUp } from "../.../../../../API/crudServices";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await doSignUp(data);
      console.log("Sign Up Successful: ", result);
      setSuccess("Sign up successful! Check your email for confirmation.");
      navigate("/");
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-[125vh] bg-white p-4 md:p-0">
      <div className="absolute top-0 left-0 w-full flex justify-between p-4 bg-white shadow-md">
        <img src={logo} alt="Cuvette Logo" className="w-24 h-auto" />
        <div>Contact</div>
      </div>

      <div className="flex-1 hidden md:block p-4 md:pl-16 ">
        <h1 className="text-3xl font-semibold mb-4">Welcome to Cuvette</h1>
        <p className="text-gray-500 max-w-lg">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="w-full max-w-sm md:max-w-md p-8 border border-gray-300 rounded-lg shadow-md mt-20 md:mt-0 md:mr-5 mr-0 mt-[10vh]">
        <h1 className="text-2xl font-semibold mb-2 text-center">Sign up</h1>
        <p className="text-gray-500 text-center mb-6">
          Lorem Ipsum is simply dummy text
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Name is required</span>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone no.
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Phone no."
              {...register("phone", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                Phone number is required
              </span>
            )}
          </div>

          <div>
            <label htmlFor="companyName" className="block font-medium">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="Company Name"
              {...register("companyName", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.companyName && (
              <span className="text-red-500 text-sm">
                Company name is required
              </span>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">
              Company Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Company Email"
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

          <div>
            <label htmlFor="employeeSize" className="block font-medium">
              Employee Size
            </label>
            <input
              id="employeeSize"
              type="number"
              placeholder="Employee Size"
              {...register("employeeSize", { required: true })}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
            {errors.employeeSize && (
              <span className="text-red-500 text-sm">
                Employee size is required
              </span>
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

export default Signup;
