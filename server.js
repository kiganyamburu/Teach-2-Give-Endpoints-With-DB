const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const config = require("./scr/dbconfig");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MSSQL and test connection
sql
  .connect(config)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to MSSQL");
    }
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.get("/test-connection", async (req, res) => {
  try {
    const pool = await sql.connect(config);
    res.status(200).json({ message: "Database connection successful" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database connection failed", details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
