
'use strict'


// use for global varible 
let winnermsg;

// create button for New Game and Reset Game
let main = document.getElementsByTagName('main')[0];
let newBtn = document.createElement('button');
let resetBtn = document.createElement('button');

newBtn.innerText = 'New Game';
resetBtn.textContent = 'Reset Game';
newBtn.className = 'new-game';
resetBtn.classList.add('reset-game');

main.appendChild(newBtn);
main.appendChild(resetBtn);


// Now coding start on Tic Tac Game
// create a Tic-Tac Button
let gameBox = document.getElementById('game');

for(let i = 1; i < 10; i++){
    let gameBtn = document.createElement('button');

    gameBox.appendChild(gameBtn);
    gameBtn.classList.add('btn','box');

}

let boxes = document.querySelectorAll(".box");  
let turn = true;
// game pattern
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


// when user click in any box then Write X or O
boxes.forEach((element) => {
    element.addEventListener('click', () =>{
        if(turn){
            element.innerText = 'X'
            turn = false;
        }else{
            element.innerText = 'O';
            turn = true
        }

        element.disabled = true;
        checkWinner();
    })
});


let checkWinner = () => {
    for(let item of  winPattern){
        let pos1Val = boxes[item[0]].innerHTML;
        let pos2Val = boxes[item[1]].innerHTML;
        let pos3Val = boxes[item[2]].innerHTML;
        console.log(pos1Val);


        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                
                let msgContainer = document.querySelector('.container');
                let existingMsg = document.querySelector('.msg');

                // Remove existing winner message if it exists
                if (existingMsg) {
                    existingMsg.remove();
                }

                // create button for show winner msg
                let msg = document.createElement('p');
                msg.className = 'msg';
                const firstChild =  msgContainer.firstElementChild;
                msgContainer.insertBefore(msg, firstChild);

                winnermsg = msg;
                showWinner(pos1Val);
                break;
            }
        }
    }
}

let showWinner = (winner) =>{
    winnermsg.classList.add('msg');
    winnermsg.innerText = `Congratulation, Winner is ${winner}`;
    disabledBtn();
}

// select element for reset or new game
let reset = document.querySelector('.reset-game');
let newGame = document.querySelector('.new-game');


// disable remaining box when 1st user winner
let disabledBtn = ()=>{
    for(let item of boxes){
        item.disabled = true;
    }
}

// for Start New Game
let enabledGame = ()=>{
    for(let item of boxes){
        item.disabled = false;
        item.innerText = '';
    }
}
// for resetGame
let resetGame = ()=>{
    turn = true;
    enabledGame();
    winnermsg.classList.remove('msg');
    winnermsg.innerText = '';
}

// reset a game for all boxes and start new game
reset.addEventListener('click', resetGame);
newGame.addEventListener('click', resetGame);



// dynamic CSS add
const styleElement = document.createElement('style');
const cssRule = `
    body{
        background:#eee;
    }
    
`;
styleElement.textContent = cssRule;
document.head.appendChild(styleElement)