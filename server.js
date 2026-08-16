require("dotenv").config();

const express = require("express");
const OpenAI = require("openai");
const path = require("path");

const app = express();
const PORT = 3000;

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
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


        const response = await client.responses.create({

            model: "gpt-5-mini",

            instructions:
                "You are Friendzy AI, a friendly and helpful friendship assistant. Be warm, kind and conversational.",

            input: message

        });


        console.log("AI response received.");

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


app.listen(PORT, () => {

    console.log(
        `Friendzy server running at http://localhost:${PORT}`
    );

});