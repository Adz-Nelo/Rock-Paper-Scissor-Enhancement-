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
    console.log('Player Score:', totalScore.playerScore);
    console.log('Computer Score:', totalScore.compScore);
}

function showResult(result, playerChoice, compChoice) {
    const choices = document.getElementById('Choices');
    const resultDiv = document.getElementById('result');
    const playerScoreDiv = document.getElementById('Player Choice');
    const playerPts = document.getElementById('playerPts')
    const compPts = document.getElementById('compPts')
    
    playerPts = Number(playerPts)
    compPts = Number(compPts)

    if (result === 'win') {
        playerPts++
        playerPts.innerText = playerPts++
        resultDiv.innerText = 'You Win! 🤩';
    } else if (result === 'tie') {
        resultDiv.innerText = "It's a Tie! ⚔️";
    } else {
        compPts++
        compPts.innerText = compPts++
        resultDiv.innerText = 'You Lose! 🥹';
    }

    choices.innerText = `${playerChoice} vs ${compChoice}`;
    playerScoreDiv.innerText = `Score: ${totalScore.playerScore}`;
}

function onClickRPS(playerChoice) {
    const compChoice = getCompChoice();
    const result = getResult(playerChoice, compChoice);

    if (result === 'win') totalScore.playerScore++;
    else if (result === 'lose') totalScore.compScore++;

    updateScoreDisplay();
    showResult(result, playerChoice, compChoice);
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
    totalScore.playerScore = 0;
    totalScore.compScore = 0;

    document.getElementById('Choices').innerText = '';
    document.getElementById('result').innerText = '';
    document.getElementById('Player Choice').innerText = '';
    updateScoreDisplay();
}

playGame();
