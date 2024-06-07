import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import sql from "mssql";
import config from "./scr/dbconfig";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Connect to MSSQL and test connection
sql
  .connect(config as sql.config)
  .then((pool) => {
    if (pool.connected) {
      console.log("Connected to MSSQL");
    }
  })
  .catch((err: Error) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.get("/test-connection", async (req: Request, res: Response) => {
  try {
    const pool = await sql.connect(config as sql.config);
    res.status(200).json({ message: "Database connection successful" });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
