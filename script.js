// Game variables - using your original structure
let totalScore = { compScore: 0, playerScore: 0 };
let rounds = 0;
let playerWins = 0;
let computerWins = 0;
let ties = 0;
let gameActive = true;

// DOM elements
const playerPts = document.getElementById('playerPts');
const compPts = document.getElementById('compPts');
const choicesDisplay = document.getElementById('Choices');
const resultDisplay = document.getElementById('result');
const stopBtn = document.getElementById('stop');
const playerChoiceDisplay = document.getElementById('playerChoiceDisplay');
const computerChoiceDisplay = document.getElementById('computerChoiceDisplay');
const roundsDisplay = document.getElementById('rounds');
const playerWinsDisplay = document.getElementById('playerWins');
const computerWinsDisplay = document.getElementById('computerWins');
const tiesDisplay = document.getElementById('ties');
const winnerBanner = document.getElementById('winnerBanner');
const overlay = document.getElementById('overlay');
const winnerTitle = document.getElementById('winnerTitle');
const winnerMessage = document.getElementById('winnerMessage');
const winnerScore = document.getElementById('winnerScore');
const playAgainBtn = document.getElementById('playAgainBtn');

// Choice buttons
const rockBtn = document.getElementById('rock');
const paperBtn = document.getElementById('paper');
const scissorBtn = document.getElementById('scissor');
const rpsBtns = [rockBtn, paperBtn, scissorBtn];

// Your original functions with enhancements
function getCompChoice() {
    const rpsChoice = ['Rock', 'Paper', 'Scissor'];
    const randNum = Math.floor(Math.random() * 3);
    return rpsChoice[randNum];
}

function getResult(playerChoice, compChoice) {
    if (playerChoice === compChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'Rock' && compChoice === 'Scissor') ||
        (playerChoice === 'Paper' && compChoice === 'Rock') ||
        (playerChoice === 'Scissor' && compChoice === 'Paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScoreDisplay() {
    playerPts.textContent = totalScore.playerScore;
    compPts.textContent = totalScore.compScore;
    
    // Update stats
    roundsDisplay.textContent = rounds;
    playerWinsDisplay.textContent = playerWins;
    computerWinsDisplay.textContent = computerWins;
    tiesDisplay.textContent = ties;
    
    // Color coding based on score difference
    if (totalScore.playerScore > totalScore.compScore) {
        playerPts.style.color = '#55efc4'; // Green for leading
        compPts.style.color = '#ff7675'; // Red for trailing
    } else if (totalScore.playerScore < totalScore.compScore) {
        playerPts.style.color = '#ff7675'; // Red for trailing
        compPts.style.color = '#55efc4'; // Green for leading
    } else {
        playerPts.style.color = '#74b9ff'; // Blue for tie
        compPts.style.color = '#74b9ff'; // Blue for tie
    }
}

function showResult(result, playerChoice, compChoice) {
    if (result === 'win') {
        resultDisplay.innerText = 'You Win! 🤩';
        resultDisplay.style.color = '#55efc4';
        playerChoiceDisplay.classList.add('win-glow');
    } else if (result === 'tie') {
        resultDisplay.innerText = "It's a Tie! ⚔️";
        resultDisplay.style.color = '#74b9ff';
    } else {
        resultDisplay.innerText = 'You Lose! 🥹';
        resultDisplay.style.color = '#ff7675';
        computerChoiceDisplay.classList.add('win-glow');
    }

    choicesDisplay.innerText = `${playerChoice} vs ${compChoice}`;
    
    // Add pulse animation
    resultDisplay.classList.add('pulse');
    setTimeout(() => {
        resultDisplay.classList.remove('pulse');
        playerChoiceDisplay.classList.remove('win-glow');
        computerChoiceDisplay.classList.remove('win-glow');
    }, 1500);
}

function updateChoiceDisplays(playerChoice, compChoice) {
    // Reset and animate
    playerChoiceDisplay.style.transform = 'scale(0.8)';
    computerChoiceDisplay.style.transform = 'scale(0.8)';
    
    // Set emojis
    const emojis = {
        'Rock': '✊',
        'Paper': '🤚',
        'Scissor': '✌️'
    };
    
    playerChoiceDisplay.textContent = emojis[playerChoice];
    computerChoiceDisplay.textContent = emojis[compChoice];
    
    // Add active class for animation
    playerChoiceDisplay.classList.add('active');
    computerChoiceDisplay.classList.add('active');
    
    // Animate back
    setTimeout(() => {
        playerChoiceDisplay.style.transform = 'scale(1)';
        computerChoiceDisplay.style.transform = 'scale(1)';
        
        setTimeout(() => {
            playerChoiceDisplay.classList.remove('active');
            computerChoiceDisplay.classList.remove('active');
        }, 300);
    }, 300);
}

function onClickRPS(playerChoice) {
    if (!gameActive) return;
    
    // Disable buttons while computer is "thinking"
    rpsBtns.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // Show thinking message with animation
    resultDisplay.innerText = 'Computer is thinking...';
    resultDisplay.classList.add('thinking');
    choicesDisplay.innerText = '';
    
    // Reset choice displays
    playerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.textContent = '?';
    
    // Wait 1.5 seconds before showing result
    setTimeout(() => {
        resultDisplay.classList.remove('thinking');
        const compChoice = getCompChoice();
        const result = getResult(playerChoice, compChoice);

        // Update choice displays with animation
        updateChoiceDisplays(playerChoice, compChoice);

        if (result === 'win') {
            totalScore.playerScore++;
            playerWins++;
        } else if (result === 'lose') {
            totalScore.compScore++;
            computerWins++;
        } else {
            ties++;
        }
        
        rounds++;

        updateScoreDisplay();
        showResult(result, playerChoice, compChoice);
        
        // Check if someone reached 10 points
        if (totalScore.playerScore >= 10 || totalScore.compScore >= 10) {
            // Wait 2 seconds so player can see the final round result
            setTimeout(() => {
                declareWinner();
            }, 2000);
        } else {
            // Re-enable buttons for next round
            setTimeout(() => {
                rpsBtns.forEach(btn => {
                    btn.disabled = false;
                    btn.style.opacity = '1';
                });
            }, 1500);
        }
    }, 1500);
}

function declareWinner() {
    gameActive = false;
    
    if (totalScore.playerScore >= 10) {
        winnerTitle.textContent = '🎉 VICTORY! 🎉';
        winnerMessage.textContent = 'You won the game!';
        winnerTitle.style.color = '#55efc4';
    } else {
        winnerTitle.textContent = '💻 DEFEAT! 💻';
        winnerMessage.textContent = 'Computer won the game!';
        winnerTitle.style.color = '#ff7675';
    }
    
    winnerScore.textContent = `Final Score: ${totalScore.playerScore} - ${totalScore.compScore}`;
    
    // Show winner banner
    overlay.classList.add('show');
    winnerBanner.classList.add('show');
}

function endGame() {
    // Reset everything
    totalScore.playerScore = 0;
    totalScore.compScore = 0;
    rounds = 0;
    playerWins = 0;
    computerWins = 0;
    ties = 0;
    gameActive = true;

    choicesDisplay.innerText = '';
    resultDisplay.innerText = 'Game Reset! Click to play again 🎮';
    resultDisplay.style.color = '#6c5ce7';
    
    // Reset choice displays
    playerChoiceDisplay.textContent = '?';
    computerChoiceDisplay.textContent = '?';
    
    updateScoreDisplay();
    
    // Re-enable buttons
    rpsBtns.forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    
    // Hide winner banner if it's showing
    overlay.classList.remove('show');
    winnerBanner.classList.remove('show');
}

function playGame() {
    // Set up event listeners
    rockBtn.onclick = () => onClickRPS('Rock');
    paperBtn.onclick = () => onClickRPS('Paper');
    scissorBtn.onclick = () => onClickRPS('Scissor');
    stopBtn.onclick = endGame;
    playAgainBtn.onclick = endGame;
    
    // Initialize display
    updateScoreDisplay();
}

// Initialize the game
playGame();