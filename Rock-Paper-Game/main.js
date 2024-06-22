'use strict'

// create a Element code start

let choices = document.querySelector('.choices');

// Function to create a container div for an image
function createImageContainer(src, ide) {
    let choice = document.createElement('div');
    choice.classList.add("choice");
    choice.id = ide;

    let img = document.createElement('img');
    img.src = src;
    // img.id = ide;


    choice.appendChild(img);
    return choice;
}
// Create containers for each image
let rockContainer = createImageContainer('img/rock.png', 'rock');
let paperContainer = createImageContainer('img/paper.png', 'paper');
let scissorsContainer = createImageContainer('img/scissors.png', 'scissors');

choices.appendChild(rockContainer);
choices.appendChild(paperContainer);
choices.appendChild(scissorsContainer);





// for scoreBoard
let scoreBoard = document.querySelector('.score-board');
function createScoreElement(userType, scoreValue, displayName){
    let score = document.createElement('div');
    score.classList.add('score');

    let userScore = document.createElement('p');
    userScore.textContent = scoreValue;
    userScore.className = userType === 'user' ? 'user-score' : 'comp-score';

    let userName = document.createElement('p')
    userName.textContent = displayName;

    score.appendChild(userScore);
    score.appendChild(userName);
    return score;


}
// Score elements for user and computer
let userScoreElement = createScoreElement('user', 0, 'You');
let compScoreElement = createScoreElement('comp', 0, 'Computer');

// Append score elements to the scoreboard
scoreBoard.appendChild(userScoreElement);
scoreBoard.appendChild(compScoreElement);



// for Show message
let msgContainer = document.querySelector('.msg-container');

let msg = document.createElement('p');
msg.textContent = 'Play Your Move';
msg.id = 'msg';
msgContainer.appendChild(msg);

let reset = document.createElement('div');
reset.classList.add('reset-game');
reset.textContent = 'Reset Game';
msgContainer.appendChild(reset);






// Rock-Paper-Scissors Code Start
let userScore1 = document.querySelector('.user-score');
let compScore1 = document.querySelector('.comp-score');
let reSetGame = document.querySelector('.reset-game');
let msgText = document.getElementById('msg');

let uScore = 0;
let cScore = 0;


let userChoices = document.querySelectorAll('.choice');
userChoices.forEach((item) =>{
    item.addEventListener('click', () =>{
        let userChoice = item.getAttribute('id');
        playGame(userChoice);
    });
});


// play Game
let playGame = (userChoice) =>{
    let compChoice = genCompChoice();
    console.log('user : ' + userChoice);
    console.log('computr: ' + compChoice);

    if(userChoice === compChoice){
        DrawGame();
    }else{
        let userWin = true;
        if(userChoice === 'rock'){
            // scissors, paper
            userWin = compChoice === 'paper' ? false : true;
        }else if (userChoice === 'paper') {
            // rock, scissors
            userWin = compChoice === 'scissors' ? false : true;
        }else {
            // rock, paper
            userWin = compChoice === 'rock' ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);

    }
}


// showWinner Game
let showWinner = (userWin, userChoice, compChoice) => {
    if(userWin){
        msgText.innerText = `You Win! Your ${userChoice} beats ${compChoice}`
        msgText.style.background = 'green';
        
        uScore = uScore + 1;
        userScore1.innerText = uScore;
    }else{
        msgText.innerText = `OH NO! You Lose...${compChoice} beats Your ${userChoice}`;
        msgText.style.background = 'red';

        cScore = cScore + 1;
        compScore1.innerText = cScore;
    }
}


// genCompChoice Game
let genCompChoice = () =>{
    let option = ['rock', 'paper', 'scissors'];
    let randomNum = Math.floor(Math.random(option) * 3);
    return option[randomNum];
}


// DrawGame
let DrawGame = () => {
    console.log("Game was Draw");
    msgText.innerText = 'Game was Draw. Again Play.';
    msgText.style.background = '#081b31';
}


function resetGame() {
    uScore = 0;
    cScore = 0;
    userScore1.textContent = uScore;
    compScore1.textContent = cScore;
    msgText.textContent = 'Again Play Your Move';
    msgText.style.background = '';
}

reSetGame.addEventListener('click', resetGame);



