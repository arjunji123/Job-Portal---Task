import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useParams for jobId in the URL
import {
  useFetchJobByIdQuery,
  useUpdateJobByIdMutation,
} from "../services/jobApi"; // Assuming you have API hooks
import SkillsSelect from "../components/SkillsSelect";
import BenefitsSelect from "../components/BenifitsSelect";

const EditJob = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const [jobData, setJobData] = useState(null);
  const { data, error, isLoading } = useFetchJobByIdQuery(jobId); // Assuming the query fetches job details
  const [updateJob] = useUpdateJobByIdMutation(); // Mutation for updating job
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setJobData(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveJob = async () => {
    try {
      // ✅ Add "saved" status before sending to backend
      const jobDataWithStatus = {
        ...jobData,
        status: "saved",
      };

      await updateJob({ jobId, jobData: jobDataWithStatus });

      alert("Job Saved Successfully!");
      navigate("/"); // Redirect to the job list page
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Something went wrong while saving the job!");
    }
  };

  const handleDraftJob = async () => {
    try {
      const draftData = { ...jobData, status: "drafted" };
      await updateJob({ jobId, jobData: draftData });
      alert("Job Saved as Draft Successfully!");
      navigate("/"); // Redirect to the job list page
    } catch (error) {
      console.error("Error saving draft job:", error);
      alert("Something went wrong while saving the draft!");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="edit-job-form max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700 tracking-tight">
        Edit Job Details
      </h2>
      <form className="space-y-6">
        {/* Job Title */}
        <div>
          <label
            htmlFor="job_title"
            className="block font-medium text-gray-700"
          >
            Job Title
          </label>
          <input
            type="text"
            name="job_title"
            id="job_title"
            value={jobData?.job_title || ""}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Category */}
        <div className="w-full mb-6">
          <label
            htmlFor="category"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            name="category"
            value={jobData?.category || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        {/* Job Designation */}
        <div className="w-full mb-6">
          <label
            htmlFor="job_designation"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Job Designation
          </label>
          <textarea
            name="job_designation"
            value={jobData?.job_designation || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Job Designation"
          />
        </div>

        {/* Job Type */}
        <div className="w-full mb-6">
          <label
            htmlFor="job_type"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Job Type
          </label>
          <select
            name="job_type"
            value={jobData?.job_type || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Job Type
            </option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Experience */}
        <div className="flex gap-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="min_experience"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Min Experience
            </label>
            <select
              name="min_experience"
              value={jobData?.min_experience || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Min Experience
              </option>
              <option value="0-1">0-1 Years</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5-10">5-10 Years</option>
              <option value="10+">10+ Years</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="max_experience"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Max Experience
            </label>
            <select
              name="max_experience"
              value={jobData?.max_experience || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Select Max Experience
              </option>
              <option value="1">1 Year</option>
              <option value="3">3 Years</option>
              <option value="5">5 Years</option>
              <option value="10">10 Years</option>
              <option value="15">15+ Years</option>
            </select>
          </div>
        </div>
        {/* Highest Qualification */}
        <div className="w-full mb-6">
          <label
            htmlFor="highest_qualification"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Highest Qualification
          </label>
          <select
            name="highest_qualification"
            value={jobData?.highest_qualification || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select Highest Qualification
            </option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
            <option value="MBA">MBA</option>
            <option value="B.Sc">B.Sc</option>
            <option value="M.Sc">M.Sc</option>
            <option value="B.Com">B.Com</option>
            <option value="M.Com">M.Com</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Area (Optional) */}
        <div className="w-full mb-6">
          <label
            htmlFor="area"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Area (Optional)
          </label>
          <input
            type="text"
            name="area"
            value={jobData?.area || ""}
            onChange={handleInputChange}
            placeholder="Area (Optional)"
            className="input w-full"
          />
        </div>

        {/* No. of Vacancies */}
        <div className="w-full mb-6">
          <label
            htmlFor="requirements"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            No. of Vacancies
          </label>
          <input
            type="number"
            name="requirements"
            value={jobData?.requirements || ""}
            onChange={handleInputChange}
            placeholder="No. of Vacancies"
            className="input w-full"
            min="0"
          />
        </div>

        {/* Salary Type */}
        <div className="w-full mb-6">
          <label
            htmlFor="salary_type"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Salary Type
          </label>
          <select
            name="salary_type"
            value={jobData?.salary_type || ""}
            onChange={handleInputChange}
            className="select w-full"
          >
            <option value="">Select Salary Type</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            <option value="Hourly">Hourly</option>
          </select>
        </div>

        {/* Min/Max Salary */}
        <div className="flex gap-4 mb-6">
          <div className="w-full">
            <label
              htmlFor="min_salary"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Min Salary
            </label>
            <select
              name="min_salary"
              value={jobData?.min_salary || ""}
              onChange={handleInputChange}
              className="input w-full"
            >
              <option value="" disabled>
                Select Min Salary
              </option>
              <option value="30000">30,000</option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="max_salary"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Max Salary
            </label>
            <select
              name="max_salary"
              value={jobData?.max_salary || ""}
              onChange={handleInputChange}
              className="input w-full"
            >
              <option value="" disabled>
                Select Max Salary
              </option>
              <option value="40000">40,000</option>
              <option value="50000">50,000</option>
              <option value="60000">60,000</option>
              <option value="70000">70,000</option>
              <option value="80000">80,000</option>
            </select>
          </div>
        </div>

        {/* Save and Draft Buttons */}
        <div>
          <button
            type="button"
            onClick={handleSaveJob}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
          <button
            type="button"
            onClick={handleDraftJob}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
