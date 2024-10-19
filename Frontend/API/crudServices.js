import axios from "axios";

// Base URL for the backend API
const backendUrl = "https://assignment-cuvette.onrender.com/v1";

/**
 * Function to handle API response.
 * @param {Object} response - Axios response object.
 * @returns {Object} - Parsed data or error.
 */
const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return { data: response.data };
  } else {
    return { error: response.data?.message || "Request failed" };
  }
};

/**
 * Function to handle API errors.
 * @param {Object} error - Axios error object.
 * @returns {Object} - Error message.
 */
const handleError = (error) => {
  console.log(error);
  if (axios.isAxiosError(error) && error.response) {
    return { error: error.response.data?.message || "Network error" };
  }
  return { error: "Network error" };
};

/**
 * Function to send a POST request for logging in a user.
 * @param {Object} data - User login data (email and password).
 * @returns {Object} - API response or error.
 */
export const loginUser = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios(`${backendUrl}/user/login`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to sign up a new user.
 * @param {Object} data - User registration data (username, email, password, etc.).
 * @returns {Object} - API response or error.
 */
export const doSignUp = async (data) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios(`${backendUrl}/user/signup`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const getUserInfo = async (token, id) => {
  try {
    const response = await axios.get(`${backendUrl}/user/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return {
      error: "Failed to fetch user information. Please try again later.",
    };
  }
};

/**
 * Function to send a POST request for sending an email OTP.
 * @param {Object} data - User data containing email address.
 * @returns {Object} - API response or error.
 */
export const sendEmailOtp = async (data, token) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(`${backendUrl}/user/send-email-otp`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to verify the email OTP.
 * @param {Object} data - User data containing OTP.
 * @returns {Object} - API response or error.
 */
export const verifyEmailOtp = async (data, token) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    mode: "no-cors",
    data: JSON.stringify({ otp: data }),
  };

  try {
    const response = await axios(
      `${backendUrl}/user/verify-email-otp`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to send a POST request for sending a phone OTP.
 * @param {Object} data - User data containing phone number.
 * @returns {Object} - API response or error.
 */
export const sendPhoneOtp = async (data, token) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios(`${backendUrl}/user/send-phone-otp`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to verify the phone OTP.
 * @param {Object} data - User data containing OTP.
 * @returns {Object} - API response or error.
 */
export const verifyPhoneOtp = async (data, token) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    data: JSON.stringify({ otp: data }),
  };

  try {
    const response = await axios(
      `${backendUrl}/user/verify-phone-otp`,
      options
    );
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to send a POST request to add a job.
 * @param {Object} data - Job data (jobTitle, jobDescription, experienceLevel, candidates, endDate).
 * @returns {Object} - API response or error.
 */
export const addJob = async (data, token) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    data: JSON.stringify(data),
  };

  try {
    const response = await axios(`${backendUrl}/jobs/create`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Function to send job emails to candidates.
 * @param {string} jobId - The ID of the job for which emails are to be sent.
 * @returns {Object} - API response or error.
 */
export const sendEmailToCandidates = async (jobId, token) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    data: JSON.stringify({ jobId: jobId }),
  };

  try {
    const response = await axios(`${backendUrl}/jobs/send-job-emails`, options);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
