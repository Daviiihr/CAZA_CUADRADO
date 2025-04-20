document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('gameArea');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const nameInputContainer = document.getElementById('nameInputContainer');
    const playerNameInput = document.getElementById('playerName');
    const submitNameButton = document.getElementById('submitNameButton');
    const scoreList = document.getElementById('scoreList');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let target;

    function showElement(element) {
        element.style.display = 'block';
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function createTarget() {
        if (target) {
            target.remove();
        }

        target = document.createElement('div');
        target.className = 'target';
        
        const maxX = gameArea.clientWidth - 50; 
        const maxY = gameArea.clientHeight - 50; 
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        
        target.addEventListener('click', targetClicked);
        gameArea.appendChild(target);
    }

    function targetClicked() {
        score += 1;
        scoreDisplay.textContent = `Puntaje: ${score}`;
        createTarget();
    }

    function updateTimer() {
        timerDisplay.textContent = `Tiempo restante: ${timeLeft}s`;
        if (timeLeft <= 0) {
            endGame();
        } else {
            timeLeft--;
        }
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        
        showElement(gameArea);
        showElement(scoreDisplay);
        showElement(timerDisplay);
        hideElement(startButton);
        
        scoreDisplay.textContent = `Puntaje: ${score}`;
        timerDisplay.textContent = `Tiempo restante: ${timeLeft}s`;
        
        createTarget();
        
        gameInterval = setInterval(updateTimer, 1000);
    }

    function endGame() {
        clearInterval(gameInterval);
        if (target) {
            target.remove();
        }
        
        hideElement(gameArea);
        showElement(nameInputContainer);
        showElement(restartButton);
    }

    function saveScore() {
        const playerName = playerNameInput.value.trim();
        if (playerName) {
            const scoreItem = document.createElement('li');
            scoreItem.textContent = `${playerName}: ${score} puntos`;
            scoreList.appendChild(scoreItem);
            
            hideElement(nameInputContainer);
            playerNameInput.value = '';
        }
    }

    function restartGame() {
        hideElement(nameInputContainer);
        hideElement(restartButton);
        showElement(startButton);
        startGame();
    }

    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', restartGame);
    submitNameButton.addEventListener('click', saveScore);
});