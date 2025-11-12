// aiRouter.js
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.ai" });

const router = express.Router();

router.post("/suggest-doctor", async (req, res) => {
  const { symptom } = req.body;
  if (!symptom) return res.status(400).json({ error: "Symptom is required" });

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1",
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content: "You are a medical assistant suggesting which doctor a patient should visit based on symptoms. Do not diagnose."
          },
          { role: "user", content: `Patient symptoms: ${symptom}. Which doctor should they see?` }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message = response.data?.choices?.[0]?.message;

    // Use content if available, otherwise reasoning
    const suggestion = message?.content?.trim() || message?.reasoning?.trim() || "Sorry, no suggestion returned.";
    console.log("AI suggestion:", suggestion);

    res.json({ suggestion });

  } catch (error) {
    console.error("AI request failed:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error.message);
    }
    res.status(500).json({ error: "AI request failed" });
  }
});

module.exports = router;
