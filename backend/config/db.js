const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "btljlg8h8gftui1l2stu-mysql.services.clever-cloud.com",
  user: "u5pgjkyh1yrewje5",
  password: "TkEyfvXa9C1ODCgMykMd",
  database: "btljlg8h8gftui1l2stu",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

module.exports = connection;
