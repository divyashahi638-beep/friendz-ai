function showPage(pageName) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById(pageName)
        .classList.add("active");
}


/* DARK MODE */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

}


/* FRIEND REQUEST */

function sendRequest(button) {

    button.textContent = "Request Sent ✓";

    button.disabled = true;

    button.style.opacity = "0.6";

}


/* SEARCH */

function searchPeople() {

    const search =
        document
            .getElementById("friendSearch")
            .value
            .toLowerCase();

    const people =
        document.querySelectorAll(".person-card");

    people.forEach(person => {

        const name =
            person
                .querySelector("h3")
                .textContent
                .toLowerCase();

        if (name.includes(search)) {

            person.style.display = "block";

        } else {

            person.style.display = "none";

        }

    });

}


/* CHAT */

function sendChat() {

    const input =
        document.getElementById("chatMessage");

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }


    const chat =
        document.getElementById("chatBox");


    const newMessage =
        document.createElement("div");

    newMessage.className = "sent";

    newMessage.textContent = message;

    chat.appendChild(newMessage);


    input.value = "";

    chat.scrollTop = chat.scrollHeight;


    setTimeout(() => {

        const reply =
            document.createElement("div");

        reply.className = "received";

        reply.textContent =
            "That sounds interesting! 😊";

        chat.appendChild(reply);

        chat.scrollTop =
            chat.scrollHeight;

    }, 800);

}


function chatEnter(event) {

    if (event.key === "Enter") {

        sendChat();

    }

}


/* AI ASSISTANT */

function sendAI() {

    async function sendAI() {

        const input =
            document.getElementById("aiMessage");

        const message =
            input.value.trim();

        if (message === "") {
            return;
        }


        const chat =
            document.getElementById("aiChat");


        // Display user's message

        const userMessage =
            document.createElement("div");

        userMessage.className = "sent";

        userMessage.textContent = message;

        chat.appendChild(userMessage);


        input.value = "";

        chat.scrollTop =
            chat.scrollHeight;


        // Show thinking message

        const thinking =
            document.createElement("div");

        thinking.className = "ai-message";

        thinking.innerHTML = `
        <strong>🤖 Friendzy AI</strong>
        <p>Thinking...</p>
    `;

        chat.appendChild(thinking);


        try {

            const response =
                await fetch("/api/chat", {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })

                });


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.error || "AI request failed"
                );

            }


            thinking.innerHTML = `
            <strong>🤖 Friendzy AI</strong>
            <p>${escapeHTML(data.reply)}</p>
        `;


        } catch (error) {

            console.error(error);

            thinking.innerHTML = `
            <strong>🤖 Friendzy AI</strong>
            <p>
                Sorry, I couldn't connect right now.
                Please try again.
            </p>
        `;

        }


        chat.scrollTop =
            chat.scrollHeight;

    }


    function escapeHTML(text) {

        const div =
            document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    function aiEnter(event) {

        if (event.key === "Enter") {

            sendAI();

        }

    }


    function getAIResponse(message) {

        const text =
            message.toLowerCase();


        if (
            text.includes("sad") ||
            text.includes("upset")
        ) {

            return "I'm sorry you're feeling this way 💜. You can tell me what happened. I'll listen.";

        }


        if (
            text.includes("happy") ||
            text.includes("good")
        ) {

            return "That's wonderful! ✨ What made you happy today?";

        }


        if (
            text.includes("friend")
        ) {

            return "Friendships can be complicated sometimes. Tell me what's happening, and we'll think it through together.";

        }


        if (
            text.includes("love") ||
            text.includes("crush")
        ) {

            return "Love can be exciting and confusing at the same time. 💕 What's on your mind?";

        }


        if (
            text.includes("hello") ||
            text.includes("hi")
        ) {

            return "Hey! 👋 I'm glad you're here. What would you like to talk about?";

        }


        const responses = [

            "I'm listening. Tell me more. 💜",

            "That sounds interesting. What happened next?",

            "I understand. How did that make you feel?",

            "You can talk to me about it. I'm here.",

            "Hmm... tell me more about that.",

            "I'm listening. What's on your mind?"

        ];


        return responses[
            Math.floor(
                Math.random() * responses.length
            )
        ];

    }


    function aiEnter(event) {

        if (event.key === "Enter") {

            sendAI();

        }

    }


    /* PROFILE */

    function editProfile() {
        const name = prompt("What should we call you?");

        if (name) {
            alert("Welcome to Friendzy, " + name + "! 💜");
        }
    }