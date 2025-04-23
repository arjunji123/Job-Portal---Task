const express = require("express");
const router = express.Router();
const {
  createJob,
  getSavedJobs,
  createJobDraft,
  getJobById,
  updateJobById,
  getAllJobs,
  getDraftedJobs,
} = require("../controllers/jobController");
const { getAll } = require("../models/jobModel");

router.post("/jobs", createJob);

router.get("/saved", getSavedJobs);
router.get("/all", getAllJobs);
router.get("/drafted", getDraftedJobs);

router.post("/draft", createJobDraft);

// Get Job by ID
router.get("/jobs/:id", getJobById);

// Update Job by ID
router.put("/jobs/:id", updateJobById);

module.exports = router;
