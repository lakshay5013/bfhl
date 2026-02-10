import express from "express";
import bfhlRoute from "./routes/bfhl.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/bfhl", bfhlRoute);

app.get("/health", (req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: "lakshay3864.beai23@chitkara.edu.in"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
