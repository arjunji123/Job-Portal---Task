const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", jobRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
