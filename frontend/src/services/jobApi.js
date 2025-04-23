import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://job-portal-task-5.onrender.com/", // Adjust the base URL if necessary
  }),
  endpoints: (builder) => ({
    // Fetch Jobs (Existing)
    fetchJobs: builder.query({
      query: () => "all", // Adjust the endpoint path as necessary
    }),
    fetchSavedJobs: builder.query({
      query: () => "saved", // Adjust the endpoint path as necessary
    }),
    fetchDraftedJobs: builder.query({
      query: () => "drafted", // Adjust the endpoint path as necessary
    }),

    // Create Job (Existing)
    createJob: builder.mutation({
      query: (jobData) => ({
        url: "jobs", // Adjust the URL path for job creation
        method: "POST",
        body: jobData,
      }),
    }),

    // Create Draft Job (New)
    createDraftJob: builder.mutation({
      query: (jobData) => ({
        url: "draft", // Adjust the URL path for creating draft
        method: "POST",
        body: jobData,
      }),
    }),
    // Fetch Job by ID
    fetchJobById: builder.query({
      query: (jobId) => `jobs/${jobId}`, // Adjust the URL path for fetching job by ID
    }),
    // Update Job by ID
    updateJobById: builder.mutation({
      query: ({ jobId, jobData }) => ({
        url: `jobs/${jobId}`, // Adjust the URL path for updating job by ID
        method: "PUT",
        body: jobData,
      }),
    }),
  }),
});

// Export auto-generated hooks
export const {
  useFetchJobsQuery,
  useFetchSavedJobsQuery,
  useFetchDraftedJobsQuery,
  useCreateJobMutation,
  useCreateDraftJobMutation,
  useFetchJobByIdQuery,
  useUpdateJobByIdMutation,
} = jobApi;
