require("dotenv").config();

const express = require("express");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = process.env.PORT || 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));


/* TEST SERVER */

app.get("/test", (req, res) => {
    res.send("Friendzy server is working!");
});


/* AI CHAT */

app.post("/api/chat", async (req, res) => {

    console.log("AI request received:", req.body);

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "No message received."
            });
        }

        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: message,

            config: {
                systemInstruction:
                    "You are Friendzy AI, a friendly and helpful friendship assistant. Be warm, kind and conversational."
            }

        });

        console.log("AI response received.");

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("AI ERROR:", error);

        res.status(500).json({
            error: error.message
        });

    }

});


app.listen(PORT, () => {

    console.log(
        `Friendzy server running at http://localhost:${PORT}`
    );

});