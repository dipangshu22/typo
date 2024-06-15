let keys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]; // Array of keys to press
let score = 0; // Initial score
let timeLimit = 30; // Default game duration in seconds
let gameActive = false; // Game status flag
let timerId; // Variable to store timer ID
let user=prompt("Enter your name")

function startGame() {
  if (!gameActive) {
    gameActive = true;
    score = 0;
    updateTime();
    updateScore();
    updateInstruction();
    startTimer();
  }
}

function updateScore() {
  document.getElementById("scoreValue").innerText = score;
}

function updateInstruction() {
  let randomKey = keys[Math.floor(Math.random() * keys.length)];
  document.getElementById("targetKey").innerText = randomKey;
}

function startTimer() {
  let secondsLeft = timeLimit;
  timerId = setInterval(function() {
    secondsLeft--;
    if (secondsLeft >= 0) {
      document.getElementById("timeLeft").innerText = secondsLeft;
    } else {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false;
  clearInterval(timerId);
  alert("Game over! " +  user+ " final score is: " + score);
}

function updateTime() {
  timeLimit = parseInt(document.getElementById("setTime").value);
  document.getElementById("timeLeft").innerText = timeLimit;
}

document.addEventListener("keydown", function(event) {
  if (gameActive) {
    let keyPressed = event.key.toUpperCase();
    let targetKey = document.getElementById("targetKey").innerText.toUpperCase();
    if (keyPressed === targetKey) {
      score++;
      updateScore();
      updateInstruction();
    } else {
      // Optionally: Highlight wrong key press
      document.getElementById("targetKey").style.backgroundColor = "red";
      setTimeout(function() {
        document.getElementById("targetKey").style.backgroundColor = "#f9f9f9";
      }, 200);
    }
  }
});
