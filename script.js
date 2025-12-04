let totalScore = { compScore: 0, playerScore: 0 };

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
    const playerPts = document.getElementById('playerPts');
    const compPts = document.getElementById('compPts');
    
    playerPts.textContent = `Your Score: ${totalScore.playerScore}`;
    compPts.textContent = `Computer Score: ${totalScore.compScore}`;
    
    console.log('Player Score:', totalScore.playerScore);
    console.log('Computer Score:', totalScore.compScore);
}

function showResult(result, playerChoice, compChoice) {
    const choices = document.getElementById('Choices');
    const resultDiv = document.getElementById('result');

    if (result === 'win') {
        resultDiv.innerText = 'You Win! 🤩';
    } else if (result === 'tie') {
        resultDiv.innerText = "It's a Tie! ⚔️";
    } else {
        resultDiv.innerText = 'You Lose! 🥹';
    }

    choices.innerText = `${playerChoice} vs ${compChoice}`;
}

function onClickRPS(playerChoice) {
    const resultDiv = document.getElementById('result');
    const choices = document.getElementById('Choices');
    
    // Disable buttons while computer is "thinking"
    const rpsBtns = document.querySelectorAll('.RPS');
    rpsBtns.forEach(btn => btn.disabled = true);
    
    // Show thinking message
    resultDiv.innerText = '🤔 Computer is thinking...';
    choices.innerText = '';
    
    // Wait 1.5 seconds before showing result
    setTimeout(() => {
        const compChoice = getCompChoice();
        const result = getResult(playerChoice, compChoice);

        if (result === 'win') totalScore.playerScore++;
        else if (result === 'lose') totalScore.compScore++;

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
            rpsBtns.forEach(btn => btn.disabled = false);
        }
    }, 1500);
}

function declareWinner() {
    const resultDiv = document.getElementById('result');
    const choices = document.getElementById('Choices');
    
    // Show who won the game
    if (totalScore.playerScore >= 10) {
        resultDiv.innerText = '🎉 YOU WIN THE GAME! 🎉';
        choices.innerText = `Final Score: ${totalScore.playerScore} - ${totalScore.compScore}`;
    } else {
        resultDiv.innerText = '💻 COMPUTER WINS THE GAME! 💻';
        choices.innerText = `Final Score: ${totalScore.playerScore} - ${totalScore.compScore}`;
    }
    
    // Keep buttons disabled - game is over
}

function playGame() {
    const rpsBtns = document.querySelectorAll('.RPS');
    rpsBtns.forEach((btn) => {
        btn.onclick = () => onClickRPS(btn.value);
    });

    const stopBtn = document.getElementById('stop');
    stopBtn.onclick = () => endGame();
}

function endGame() {
    // Reset everything
    totalScore.playerScore = 0;
    totalScore.compScore = 0;

    document.getElementById('Choices').innerText = '';
    document.getElementById('result').innerText = 'Game Reset! Click to play again 🎮';
    updateScoreDisplay();
    
    // Re-enable buttons
    const rpsBtns = document.querySelectorAll('.RPS');
    rpsBtns.forEach(btn => btn.disabled = false);
}

playGame();