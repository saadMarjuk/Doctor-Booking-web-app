// aiRouter.js
const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/suggest-doctor", async (req, res) => {
  const { symptom } = req.body;
  if (!symptom) return res.status(400).json({ error: "Symptom is required" });

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1",
          max_tokens: 50, // <-- Limit response length
        messages: [
          { role: "system", content: "You are a medical assistant suggesting which doctor a patient should visit based on symptoms. Do not diagnose." },
          { role: "user", content: `Patient symptoms: ${symptom}. Which doctor should they see?` },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.json({ suggestion: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router; // ✅ CommonJS
