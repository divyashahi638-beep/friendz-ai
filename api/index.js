require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.get("/test", (req, res) => {
    res.send("Friendzy server is working!");
});

app.post("/api/chat", async (req, res) => {
    try {
        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "No message received."
            });
        }

        const response = await client.responses.create({
            model: "gpt-5-mini",
            instructions:
                "You are Friendzy AI, a friendly and helpful friendship assistant. Be warm, kind and conversational.",
            input: message
        });

        res.json({
            reply: response.output_text
        });

    } catch (error) {
        console.error("AI ERROR:", error);

        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = app;