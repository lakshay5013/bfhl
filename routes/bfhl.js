import express from "express";
import { fibonacciSeries, primeFilter, lcmArray, hcfArray } from "../utils/math.js";
import { askAI } from "../utils/ai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: "lakshay3864.beai23@chitkara.edu.in",
        error: "Request must contain exactly one key"
      });
    }

    const key = keys[0];
    let result;

    if (key === "fibonacci") {
      if (!Number.isInteger(body[key]) || body[key] < 1)
        throw new Error("Invalid fibonacci input");
      result = fibonacciSeries(body[key]);
    }
    else if (key === "prime") {
      if (!Array.isArray(body[key]))
        throw new Error("Prime input must be array");
      result = primeFilter(body[key]);
    }
    else if (key === "lcm") {
      if (!Array.isArray(body[key]))
        throw new Error("LCM input must be array");
      result = lcmArray(body[key]);
    }
    else if (key === "hcf") {
      if (!Array.isArray(body[key]))
        throw new Error("HCF input must be array");
      result = hcfArray(body[key]);
    }
    else if (key === "AI") {
      if (typeof body[key] !== "string")
        throw new Error("AI input must be string");
      result = await askAI(body[key]);
    }
    else {
      return res.status(400).json({
        is_success: false,
        official_email: "lakshay3864.beai23@chitkara.edu.in",
        error: "Invalid key"
      });
    }

    return res.status(200).json({
      is_success: true,
      official_email: "lakshay3864.beai23@chitkara.edu.in",
      data: result
    });

  } catch (err) {

  if (
    err.message.includes("Invalid") ||
    err.message.includes("must be") ||
    err.message.includes("exactly one key")
  ) {
    return res.status(400).json({
      is_success: false,
      official_email: "lakshay3864.beai23@chitkara.edu.in",
      error: err.message
    });
  }

  return res.status(500).json({
    is_success: false,
    official_email: "lakshay3864.beai23@chitkara.edu.in",
    error: "Internal Server Error"
  });
}
});

export default router;
