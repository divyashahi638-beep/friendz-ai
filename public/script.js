console.log("FRIENDZY JS LOADED");


/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }
}


/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {

    document.body.classList.toggle("dark");

}


/* =========================
   FRIEND REQUEST
========================= */

function sendRequest(button) {

    button.textContent = "Request Sent ✓";

    button.disabled = true;

    button.style.opacity = "0.6";

}


/* =========================
   SEARCH PEOPLE
========================= */

function searchPeople() {

    const searchInput =
        document.getElementById("friendSearch");

    if (!searchInput) {
        return;
    }

    const search =
        searchInput.value.toLowerCase();

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


/* =========================
   FRIEND CHAT
========================= */

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

    chat.scrollTop =
        chat.scrollHeight;


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


/* =========================
   REAL AI ASSISTANT
========================= */

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


    /* User message */

    const userMessage =
        document.createElement("div");

    userMessage.className = "sent";

    userMessage.textContent = message;

    chat.appendChild(userMessage);


    input.value = "";

    chat.scrollTop =
        chat.scrollHeight;


    /* Thinking message */

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
                    "Content-Type": "application/json"
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


/* =========================
   PROTECT AI RESPONSE
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================
   AI ENTER KEY
========================= */

function aiEnter(event) {

    if (event.key === "Enter") {
        sendAI();
    }

}


/* =========================
   PROFILE
========================= */

function editProfile() {

    const name =
        prompt("What should we call you?");

    if (name) {

        alert(
            "Welcome to Friendzy, " +
            name +
            "! 💜"
        );

    }

}