const levels = 5;
let currentLevel = 1;
let targetNumber = Math.floor(Math.random() * 10) + 1;
let isTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
    updateLevelDisplay();
});

function updateLevelDisplay() {
    const levelElement = document.getElementById('level');
    if (levelElement) {
        levelElement.textContent = `Current Level: ${currentLevel}`;
    }
}

function playGame() {
    if (isTransitioning) return;

    const userGuess = parseInt(document.getElementById('guess').value);
    const messageElement = document.getElementById('message');

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        messageElement.textContent = "Please enter a valid number between 1 and 10.";
        return;
    }

    if (userGuess === targetNumber) {
        if (currentLevel < levels) {
            messageElement.textContent = `You guessed it right! Level ${currentLevel} completed.`;
            const magicBox = document.getElementById('magic-box');
            magicBox.style.backgroundImage = "url('open.jpg')";
            isTransitioning = true;

            setTimeout(() => {
                magicBox.style.backgroundImage = "url('close.jpg')";
                currentLevel++;
                targetNumber = Math.floor(Math.random() * 10) + 1;
                isTransitioning = false;
                updateLevelDisplay();
            }, 10000);
        } else {
            messageElement.textContent = "Congratulations! You won all the levels!";
            document.getElementById('magic-box').style.backgroundImage = "url('open.jpg')";
        }
    } else if (userGuess < targetNumber) {
        messageElement.textContent = "Too low! Try a higher number.";
    } else {
        messageElement.textContent = "Too high! Try a lower number.";
    }
}