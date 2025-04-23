const db = require("../config/db");

exports.createJob = (jobData, callback) => {
  const sql = "INSERT INTO jobs SET ?";
  db.query(sql, jobData, callback);
};

exports.getSaved = (callback) => {
  const sql = "SELECT * FROM jobs WHERE status = 'saved'";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.getDrafted = (callback) => {
  const sql = "SELECT * FROM jobs WHERE status = 'drafted'";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.getAll = (callback) => {
  const sql = "SELECT * FROM jobs";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
// Create Draft Job: Insert a new job with status 'drafted'
exports.createDraftJob = (jobData, callback) => {
  // Set the status to 'drafted' when creating a draft job
  jobData.status = "drafted";

  const sql = "INSERT INTO jobs SET ?";
  db.query(sql, jobData, callback);
};

exports.getJobById = (jobId, callback) => {
  const query = "SELECT * FROM jobs WHERE id = ?";
  db.query(query, [jobId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result[0]); // Return the first job in the result (it should only be one)
  });
};

// Update Job by ID in the database
exports.updateJobById = (jobId, updatedJobData, callback) => {
  const query = "UPDATE jobs SET ? WHERE id = ?";
  db.query(query, [updatedJobData, jobId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
};
