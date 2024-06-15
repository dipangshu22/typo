const quotes = {
    symbols: ["! @ # $ % ^ & * ( ) _ + - = { } | : \" < > ?"],
    alphabets: ["A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"],
    sentences: [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "An apple a day keeps the doctor away.",
        "Beauty is in the eye of the beholder.",
        "Birds of a feather flock together.",
        "Don't count your chickens before they hatch.",
        "Every cloud has a silver lining.",
        "Fortune favors the brave.",
        "Haste makes waste.",
        "If it ain't broke, don't fix it.",
        "It's no use crying over spilled milk.",
        "Laughter is the best medicine.",
        "A picture is worth a thousand words.",
        "Kaziranga National Park, located in Assam, India",
         "covers an area of approximately 430 square kilometers.",
        "Kaziranga's landscape includes vast grasslands", 
        "wetlands, and dense forests, shaped by the Brahmaputra River's annual flooding.",
        
    ],
    words: [
        "apple", "banana", "cherry", "date", "elderberry", "fig", "grape",
        "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya"
    ],
    numbers: ["1 2 3 4 5 6 7 8 9 0"]
};

let currentQuote = "";
let startTime = null;
let timer = null;
let duration = 1;
let chapter = "sentences";
let quotesCompleted = 0;
let totalSentences = 15;

document.getElementById("timeSelect").addEventListener("change", function() {
    duration = parseInt(this.value);
});

document.getElementById("chapterSelect").addEventListener("change", function() {
    chapter = this.value;
});

function getRandomQuotes(chapter, num) {
    const selectedQuotes = quotes[chapter];
    if (chapter === "words") {
        return Array.from({ length: num }, () => selectedQuotes[Math.floor(Math.random() * selectedQuotes.length)]).join(' ');
    } else {
        const shuffledQuotes = selectedQuotes.sort(() => 0.5 - Math.random());
        return shuffledQuotes.slice(0, num).join(' ');
    }
}

function startTest() {
    quotesCompleted = 0;
    currentQuote = getRandomQuotes(chapter, totalSentences);
    displayQuote(currentQuote);
    document.getElementById("input").value = "";
    document.getElementById("input").disabled = false;
    document.getElementById("input").focus();
    document.getElementById("wpm").innerText = "0";
    document.getElementById("accuracy").innerText = "0";
    startTime = new Date().getTime();
    if (timer) clearTimeout(timer);
    timer = setTimeout(endTest, duration * 60 * 1000);
    updateTimer();
}

function displayQuote(quote) {
    document.getElementById("quote").innerHTML = quote.split('').map(char => `<span>${char}</span>`).join('');
}

function updateTimer() {
    const timeLeftElement = document.getElementById("timeLeft");
    const interval = setInterval(() => {
        const elapsedTime = (new Date().getTime() - startTime) / 1000;
        const timeLeft = (duration * 60) - elapsedTime;
        if (timeLeft <= 0) {
            clearInterval(interval);
            endTest();
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = Math.floor(timeLeft % 60);
            timeLeftElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function calculateWPM() {
    const inputText = document.getElementById("input").value.trim();
    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60;
    const wordCount = inputText.split(/\s+/).length;
    const wpm = Math.round(wordCount / elapsedTime);
    document.getElementById("wpm").innerText = wpm;
}

function calculateAccuracy() {
    const inputText = document.getElementById("input").value.split('');
    const quoteChars = currentQuote.split('');
    let correctChars = 0;

    inputText.forEach((char, index) => {
        if (char === quoteChars[index]) {
            correctChars++;
        }
    });

    const accuracy = Math.round((correctChars / quoteChars.length) * 100);
    document.getElementById("accuracy").innerText = accuracy;
}

function checkTyping() {
    const inputText = document.getElementById("input").value.split('');
    const quoteSpans = document.querySelectorAll('#quote span');
    quoteSpans.forEach((char, index) => {
        const typedChar = inputText[index];
        if (typedChar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');
        }
    });

    calculateWPM();
    calculateAccuracy();

    if (inputText.length === currentQuote.length) {
        quotesCompleted++;
        if (quotesCompleted < totalSentences) {
            currentQuote += " " + getRandomQuotes(chapter, 1);
            displayQuote(currentQuote);
            document.getElementById("input").value += " ";
        } else {
            endTest();
        }
    }
}

function endTest() {
    document.getElementById("input").disabled = true;
    clearTimeout(timer);
    calculateWPM();
    calculateAccuracy();
}

function resetTest() {
    if (timer) clearTimeout(timer);
    startTest();
}

function changeTheme() {
    const theme = document.getElementById("themeSelect").value;
    document.body.className = `${theme}-theme`;
}

window.onload = function() {
    document.getElementById("input").disabled = true;
};
