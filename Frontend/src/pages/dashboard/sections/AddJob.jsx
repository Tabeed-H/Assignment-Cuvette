import React, { useState } from "react";
import { addJob, sendEmailToCandidates } from "../../../../API/crudServices";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function AddJob({ onClose }) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [endDate, setEndDate] = useState("");
  const authUser = useAuthUser();
  const token = useAuthHeader();

  const handleInputKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      const email = e.target.value.trim();
      if (email) {
        setCandidates([...candidates, email]);
        e.target.value = ""; // Clear input
      }
    }
  };

  const handleRemoveCandidate = (index) => {
    const newCandidates = [...candidates];
    newCandidates.splice(index, 1);
    setCandidates(newCandidates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      jobTitle,
      jobDescription,
      experienceLevel,
      candidates,
      endDate,
    };
    // Add Job
    const addJobResponse = await addJob(jobData, token);
    console.log(addJobResponse);

    // Job Added - Send Email
    if (!addJobResponse.error) {
      const jobId = addJobResponse.data.data._id;

      const emailResponse = await sendEmailToCandidates(jobId, token);

      if (!emailResponse.error) {
        alert("Job added and emails sent successfully!");
      } else {
        alert("Job added but failed to send emails.");
      }
    } else {
      alert("Failed to add job.");
    }

    onClose();
  };

  return (
    <div className="flex w-full h-full p-6">
      <form onSubmit={handleSubmit} className="p-4 mb-6 bg-white w-full ">
        {/* Job Title */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="jobTitle"
            className="block text-gray-700 font-semibold mr-4 w-1/3"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            placeholder="Enter job title"
            className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="mb-4 flex items-start">
          <label
            htmlFor="jobDescription"
            className="block text-gray-700 font-semibold mr-4 w-1/3"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            placeholder="Enter job description"
            className="border border-gray-300 rounded-md px-3 py-2 w-2/3 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>

        {/* Experience Level */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="experienceLevel"
            className="block text-gray-700 font-semibold mr-4 w-1/3"
          >
            Experience Level
          </label>
          <input
            type="text"
            id="experienceLevel"
            placeholder="Enter experience level"
            className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            required
          />
        </div>

        {/* Candidates Input */}
        <div className="mb-4 flex items-start">
          <label className="block text-gray-700 font-semibold mr-4 w-1/3">
            Candidates
          </label>
          <div className="flex flex-col w-2/3">
            <div className="flex flex-wrap border border-gray-300 rounded-md p-2 bg-gray-50">
              {candidates.map((candidate, index) => (
                <div
                  key={index}
                  className="bg-blue-200 text-blue-800 text-sm rounded-full px-2 py-1 mr-2 mb-2 flex items-center"
                >
                  {candidate}
                  <button
                    type="button"
                    onClick={() => handleRemoveCandidate(index)}
                    className="ml-1 text-blue-800 hover:text-red-600"
                  >
                    x
                  </button>
                </div>
              ))}
              <input
                type="email"
                placeholder="Type email and press space"
                className="border border-gray-300 rounded-md px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={handleInputKeyDown}
              />
            </div>
          </div>
        </div>

        {/* End Date */}
        <div className="mb-4 flex items-center">
          <label
            htmlFor="endDate"
            className="block text-gray-700 font-semibold mr-4 w-1/3"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="border border-gray-300 rounded-md px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJob;
