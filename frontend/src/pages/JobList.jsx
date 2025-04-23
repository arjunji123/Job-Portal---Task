import React, { useState } from "react";
import { useFetchJobsQuery } from "../services/jobApi";
import { useNavigate } from "react-router-dom"; // for navigation
import { useEffect } from "react";

const JobsList = () => {
  const [openDescriptionId, setOpenDescriptionId] = useState(null);
  const { data: jobs, error, isLoading, refetch } = useFetchJobsQuery();
  const navigate = useNavigate(); // Hook for navigation
  useEffect(() => {
    // Refetch jobs when page is navigated to or job is updated
    refetch();
  }, [refetch]); // Add necessary dependencies
  if (isLoading)
    return (
      <p className="text-center mt-10 text-lg text-gray-600">Loading jobs...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-600 text-lg">
        Error loading jobs: {error.message}
      </p>
    );

  const toggleDescription = (jobId) => {
    setOpenDescriptionId((prevId) => (prevId === jobId ? null : jobId));
  };

  const handleEditJob = (jobId) => {
    // Navigate to the Edit Job page, passing the job ID
    navigate(`/edit-job/${jobId}`);
  };

  const handleSavedJob = () => {
    // Navigate to the Edit Job page, passing the job ID
    navigate(`/saved-jobs`);
  };

  const handleDraftedJob = () => {
    // Navigate to the Edit Job page, passing the job ID
    navigate(`/drafted-jobs`);
  };

  const handleCreateJob = () => {
    // Navigate to the Edit Job page, passing the job ID
    navigate("/create-job");
  };

  return (
    <div className="jobs-list max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold mb-10 text-center text-indigo-700 tracking-tight">
        Explore Job Opportunities
      </h2>
      <div className="gap-4 flex justify-center mb-6">
        {" "}
        <button
          onClick={() => handleSavedJob()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Saved Jobs
        </button>
        <button
          onClick={() => handleDraftedJob()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Drafted Jobs
        </button>
        <button
          onClick={() => handleCreateJob()}
          className="bg-red-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Create Job{" "}
        </button>
      </div>

      <br />
      <br />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense items-start">
        {jobs.map((job, index) => {
          const jobId = job._id || job.id || index;

          return (
            <div
              key={jobId}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.job_title}
                </h3>
                <p className="text-sm font-medium text-indigo-600">
                  {job.category}
                </p>
                <p className="text-sm text-gray-500">
                  {job.job_type} • {job.job_designation}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  onClick={() => handleEditJob(jobId)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => toggleDescription(jobId)}
                  className="ml-auto text-indigo-500 hover:text-indigo-700 text-sm underline"
                >
                  {openDescriptionId === jobId ? "Hide" : "View"} Description
                </button>
              </div>

              {openDescriptionId === jobId && (
                <div className="mt-5 border-t pt-4 text-sm text-gray-700 space-y-3 transition-all">
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {job.job_description}
                  </p>

                  {job.skills && (
                    <div>
                      <p className="font-medium text-gray-800">Skills:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {JSON.parse(job.skills).map((skill, idx) => (
                          <li key={idx}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.benefits && (
                    <div>
                      <p className="font-medium text-gray-800">Benefits:</p>
                      <ul className="list-disc list-inside text-gray-600">
                        {JSON.parse(job.benefits).map((benefit, idx) => (
                          <li key={idx}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobsList;
