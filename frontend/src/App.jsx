import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Correct import here
import JobForm from "./pages/JobForm";
import JobList from "./pages/JobList"; // Assuming you have the JobList component
import EditJobPage from "./pages/EditJobPage";
import SavedJobs from "./pages/SavedJobs";
import DraftedJobs from "./pages/DraftedJobs";
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Job List */}
        <Route path="/" element={<JobList />} />

        {/* Route for Job Form (Create Job) */}
        <Route path="/create-job" element={<JobForm />} />

        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/drafted-jobs" element={<DraftedJobs />} />

        <Route path="/edit-job/:jobId" element={<EditJobPage />} />
      </Routes>
    </Router>
  );
}

export default App;
