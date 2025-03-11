// Ensure Speech Recognition API is supported
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
    throw new Error("Speech Recognition API not supported");
}

// Initialize Speech Recognition
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = "en-US";

// Debugging: Log when recognition starts
recognition.onstart = function () {
    console.log("✅ Voice recognition activated.");
};

// Debugging: Handle errors
recognition.onerror = function (event) {
    console.error("❌ Speech recognition error:", event.error);
    alert(`Speech recognition error: ${event.error}`);
};

// Process voice commands
recognition.onresult = function (event) {
    let transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
    console.log(`🎤 User said: ${transcript}`);

    // ✅ **Respond to Greetings**
    if (transcript.includes("hi alex") || transcript.includes("hello alex")) {
        readOut("Hello, how can I assist you today?");
    }

    // ✅ **Respond to Work**
    if (transcript.includes("alex what can you do") || transcript.includes("alex tell your functionalities")) {
        readOut("My Functionalities include to perform Web Searches, Open Youtube and particular videos and to tell the date and time, tell facts and jokes and also to give motivational quotes and a few more.");
    }

        // ✅ **Respond to Greetings**
        if (transcript.includes("how are you") || transcript.includes("how are you doing")) {
            readOut("I'm doing great! Thank you for asking, what about you?");
        }

            // ✅ **Respond to Greetings**
    if (transcript.includes("i am good to") || transcript.includes("i am fine to")) {
        readOut("That's great to hear! How can I assist you today?");
    }

    // ✅ **Search Google**
    if (transcript.startsWith("search for")) {
        let query = transcript.replace("search for", "").trim();
        if (query) {
            readOut(`Searching Google for ${query}`);
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
        } else {
            readOut("Please say what you want to search for.");
        }
    }

    // ✅ **Open Websites**
    function openWebsite(url, name) {
        let newTab = window.open(url, "_blank");
        if (newTab) {
            readOut(`Opening ${name}.`);
        } else {
            readOut(`Failed to open ${name}. Please check your browser settings.`);
        }
    }

    if (transcript.includes("open youtube")) openWebsite("https://www.youtube.com/", "YouTube");
    if (transcript.includes("open google")) openWebsite("https://www.google.com/", "Google");
    if (transcript.includes("open facebook")) openWebsite("https://www.facebook.com/", "Facebook");

    // ✅ **NEW: Play a Video on YouTube**
    if (transcript.startsWith("play") && transcript.includes("on youtube")) {
        let query = transcript.replace("play", "").replace("on youtube", "").trim();
        if (query) {
            readOut(`Playing ${query} on YouTube.`);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        } else {
            readOut("Please specify which video to play on YouTube.");
        }
    }

    // ✅ **NEW: Play/Pause Video**
    if (transcript.includes("pause video")) {
        let video = document.querySelector("video");
        if (video) {
            video.pause();
            readOut("Pausing the video.");
        } else {
            readOut("No video found on this page.");
        }
    }

    if (transcript.includes("play video")) {
        let video = document.querySelector("video");
        if (video) {
            video.play();
            readOut("Playing the video.");
        } else {
            readOut("No video found on this page.");
        }
    }

    // ✅ **NEW: Search YouTube**
    if (transcript.startsWith("search youtube for")) {
        let query = transcript.replace("search youtube for", "").trim();
        if (query) {
            readOut(`Searching YouTube for ${query}`);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`, "_blank");
        } else {
            readOut("Please specify what you want to search on YouTube.");
        }
    }

    // ✅ **Tell a Joke**
    if (transcript.includes("tell me a joke")) {
        let jokes = [
            "Why don’t skeletons fight each other? They don’t have the guts.",
            "I'm reading a book about anti-gravity. It’s impossible to put down!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        let joke = jokes[Math.floor(Math.random() * jokes.length)];
        readOut(joke);
    }

     // Give Motivation
    if (transcript.includes("give me motivation") || transcript.includes("motivate me")) {
        let quotes = [
            "Don't watch the clock; do what it does. Keep going.",
            "The secret of getting ahead is getting started.",
            "Believe you can and you're halfway there.",
            "Your limitation—it's only your imagination."
        ];
        let quote = quotes[Math.floor(Math.random() * quotes.length)];
        readOut(quote);
    }


        // Tell a Fact
        if (transcript.includes("tell me a fact")) {
            let facts = [
                "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still perfectly good.",
                "Bananas are berries, but strawberries aren't.",
                "Octopuses have three hearts and their blood is blue.",
                "There are more stars in the universe than grains of sand on Earth."
            ];
            let fact = facts[Math.floor(Math.random() * facts.length)];
            readOut(fact);
        }

    // ✅ **Current Time**
    if (transcript.includes("what is the time") || transcript.includes("tell me the time")) {
        let currentTime = new Date().toLocaleTimeString();
        readOut(`The current time is ${currentTime}`);
    }

    // ✅ **Change Background Color**
    if (transcript.includes("change background to")) {
        let color = transcript.split("change background to")[1].trim();
        document.body.style.backgroundColor = color;
        readOut(`Changing background color to ${color}`);
    }

    // Open Notepad (Windows Only)
    if (transcript.includes("open notepad")) {
        readOut("Opening Notepad.");
        window.open("notepad.exe", "_blank");
    }

     // Open Calculator (Windows Only)
    if (transcript.includes("open calculator")) {
        readOut("Opening Calculator.");
        window.open("calc.exe", "_blank");
    }

    // ✅ **Increase/Decrease Font Size**
    if (transcript.includes("increase font size")) {
        document.body.style.fontSize = "larger";
        readOut("Increasing font size.");
    }

    if (transcript.includes("decrease font size")) {
        document.body.style.fontSize = "smaller";
        readOut("Decreasing font size.");
    }

    // ✅ **Reload the Page**
    if (transcript.includes("reload the page")) {
        readOut("Reloading the page.");
        location.reload();
    }

    // ✅ **Navigation (Back/Forward)**
    if (transcript.includes("go back")) {
        readOut("Going back.");
        window.history.back();
    }

    if (transcript.includes("go forward")) {
        readOut("Going forward.");
        window.history.forward();
    }

    // ✅ **Copy Text to Clipboard**
    if (transcript.includes("copy text")) {
        let textToCopy = window.getSelection().toString();
        navigator.clipboard.writeText(textToCopy).then(() => {
            readOut("Text copied to clipboard.");
        });
    }

    // ✅ **Mute/Unmute Audio**
    if (transcript.includes("mute sound")) {
        document.querySelectorAll("audio, video").forEach(el => el.muted = true);
        readOut("Muting sound.");
    }

    if (transcript.includes("unmute sound")) {
        document.querySelectorAll("audio, video").forEach(el => el.muted = false);
        readOut("Unmuting sound.");
    }

    // ✅ **Scroll Up/Down**
    if (transcript.includes("scroll down")) {
        window.scrollBy(0, window.innerHeight);
        readOut("Scrolling down.");
    }

    if (transcript.includes("scroll up")) {
        window.scrollBy(0, -window.innerHeight);
        readOut("Scrolling up.");
    }

    // ✅ **Close Tab**
    if (transcript.includes("close tab")) {
        readOut("Closing the tab.");
        window.close();
    }

    // ✅ **Today's Date**
    if (transcript.includes("what is today's date") || transcript.includes("tell me the date")) {
        let today = new Date().toLocaleDateString();
        readOut(`Today's date is ${today}`);
    }
};

// Debugging: Log when recognition stops
recognition.onend = function () {
    console.log("⏹️ Voice recognition stopped.");
};

// Button Actions
document.querySelector("#start").addEventListener("click", () => recognition.start());
document.querySelector("#stop").addEventListener("click", () => recognition.stop());
document.querySelector("#speak").addEventListener("click", () => readOut("Hello I am ALEX, Your Personal Chatbot Assistant"));

// Text-to-Speech
function readOut(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// Greet User on Page Load
window.onload = function () {
    setTimeout(() => readOut("What can I help you with, sir?"), 1000);
};
