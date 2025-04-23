const Job = require("../models/jobModel"); // Correct the import to match the model name

// Create Job: Insert a new job into the database
exports.createJob = (req, res) => {
  const jobData = req.body;

  // JSON stringify if coming as object
  if (typeof jobData.skills === "object") {
    jobData.skills = JSON.stringify(jobData.skills);
  }
  if (typeof jobData.benefits === "object") {
    jobData.benefits = JSON.stringify(jobData.benefits);
  }

  Job.createJob(jobData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res
      .status(201)
      .json({ message: "Job Created Successfully", jobId: result.insertId });
  });
};

// Get All Jobs: Fetch all jobs from the database
exports.getSavedJobs = (req, res) => {
  Job.getSaved((err, jobs) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(jobs);
  });
};

exports.createJobDraft = (req, res) => {
  const jobData = req.body;

  // Ensure the status is 'drafted' when saving a draft
  jobData.status = "drafted"; // Set status to 'drafted'

  // Debugging: Log the jobData to confirm the status
  console.log("Job Data Before Insertion: ", jobData);

  // Handle array fields (e.g., skills, benefits) if they're objects
  if (typeof jobData.skills === "object") {
    jobData.skills = JSON.stringify(jobData.skills);
  }
  if (typeof jobData.benefits === "object") {
    jobData.benefits = JSON.stringify(jobData.benefits);
  }

  // Create the job in the database with status 'drafted'
  Job.createJob(jobData, (err, result) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Job Created as Drafted Successfully",
      jobId: result.insertId,
    });
  });
};

// Get Job by ID: Fetch a job from the database by its ID
exports.getJobById = (req, res) => {
  const jobId = req.params.id; // Get job ID from request parameters

  Job.getJobById(jobId, (err, job) => {
    if (err) {
      console.error("Error fetching job:", err);
      return res.status(500).json({ error: "Failed to fetch job" });
    }

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.status(200).json(job);
  });
};

// Update Job by ID: Update a job in the database by its ID
exports.updateJobById = (req, res) => {
  const jobId = req.params.id; // Get job ID from request parameters
  const updatedJobData = req.body;

  updatedJobData.status = "saved"; // Set status to 'saved'

  // Handle JSON fields (e.g., skills, benefits)
  if (typeof updatedJobData.skills === "object") {
    updatedJobData.skills = JSON.stringify(updatedJobData.skills);
  }
  if (typeof updatedJobData.benefits === "object") {
    updatedJobData.benefits = JSON.stringify(updatedJobData.benefits);
  }

  // Update the job
  Job.updateJobById(jobId, updatedJobData, (err, result) => {
    if (err) {
      console.error("Error updating job:", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Job not found to update" });
    }

    res.status(200).json({
      message: "Job updated as saved successfully",
      jobId: jobId,
    });
  });
};

exports.getAllJobs = (req, res) => {
  Job.getAll((err, jobs) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(jobs);
  });
};

exports.getDraftedJobs = (req, res) => {
  Job.getDrafted((err, jobs) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(jobs);
  });
};
