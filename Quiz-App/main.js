const quizData = [
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text:"Mars", correct: true},
            {text:"Venus", correct: false},
            {text:"Jupiter", correct: false},
            {text:"Mercury", correct: false},
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            {text:"London", correct: false},
            {text:"Berlin", correct: false},
            {text:"Paris", correct: true},
            {text:"Rome", correct: false},
        ]
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
            {text:"William Shakespeare", correct: true},
            {text:"Charles Dickens", correct: false},
            {text:"Jane Austen", correct: false},
            {text:"Mark Twain", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text:"H2O", correct: true},
            {text:"CO2", correct: false},
            {text:"O2", correct: false},
            {text:"CH4", correct: false},
        ]
    },
    {
        question: "Which country is famous for its pyramids?",
        answers: [
            {text:"Greece", correct: false},
            {text:"Italy", correct: false},
            {text:"Egypt", correct: true},
            {text:"Brazil", correct: false},
        ]
    },
    {
        question: "What is the largest ocean in the world?",
        answers: [
            {text:"Atlantic Ocean", correct: false},
            {text:"Arctic Ocean", correct: false},
            {text:"Indian Ocean", correct: false},
            {text:"Pacific Ocean", correct: true},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text:"Leonardo da Vinci", correct: true},
            {text:"Vincent van Gogh", correct: false},
            {text:"Pablo Picasso", correct: false},
            {text:"Michelangelo", correct: false},
        ]
    },
];


let questionElement = document.querySelector('#question');
let answerElements = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resetButton = document.getElementById('reset-btn');
const question_index = document.getElementById('question-index');
let timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;

//  quiz timer
let totalQuizTime = 120; 
let timerLeft = totalQuizTime;
let timerInterval;
let quizEnded = false;



// startTimer
function startTimer(){
    timerElement.textContent = formatTime(timerLeft);

    timerInterval = setInterval(() =>{
        timerElement.textContent = formatTime(timerLeft);

        timerLeft--;

        if(timerLeft < 0){
            clearInterval(timerInterval);
            timerElement.textContent = 'Quiz finished!';
            endQuiz();
        }
    }, 1000)
}


// formatTime
function formatTime(seconds){
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    return `0${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}



// endQuiz
function endQuiz(){
    if(!quizEnded){
        quizEnded = true;
        // Stop the timer when user quiz  complete
        clearInterval(timerInterval);
        timerElement.textContent = 'Quiz finished!';
        question_index.innerText = '';
        resetButton.style.display = 'block';
        nextButton.style.display = 'none'

        const percentageScore = Math.floor((score / quizData.length) * 100);
        
        questionElement.innerHTML = `Quiz finished! Your score: ${score} out of ${quizData.length} <br><br> Percentage Score: ${percentageScore}% <br><br> Time taken: ${formatTime(totalQuizTime - timerLeft - 1)}`;

        // Customize pass/fail message
        const resultMessage = score >= (quizData.length / 2) ? 'Congratulations! You Passed!' : 'You Failed. Better Luck Next Time!';
        answerElements.innerHTML = resultMessage;
        answerElements.style.marginTop = "10px";
    }
}



// loadQuestion and option
function loadQuestion() {

    if(currentQuestionIndex < quizData.length){
        nextButton.disabled = true;

        question_index.textContent = `${currentQuestionIndex + 1}/${quizData.length} question`;
        //  load question
        const questionShow = quizData[currentQuestionIndex];
        questionElement.innerHTML = `${currentQuestionIndex + 1}. ${questionShow.question}`;
        
        // loadOption
        answerElements.innerHTML = '';
        
        questionShow.answers.forEach((option) =>{
            let button = document.createElement("button");
            button.classList.add('btn');
            button.innerText = option.text;

            button.addEventListener('click', ()=>{
                answerChecker(option.correct, button);

                if(!option.correct){
                    highlightCorrectAnswer()
                }
                nextButton.disabled = false;
            });
            answerElements.appendChild(button);
        });

    }else{
        endQuiz();
        questionElement.innerHTML = `Quiz finished! Your score: ${score} out of ${quizData.length} <br><br> Percentage Score: ${percentageScore}% <br><br> Time taken: ${formatTime(totalQuizTime - timerLeft)}`;

        // Customize pass/fail message
        const resultMessage = score >= (quizData.length / 2) ? 'Congratulations! You Passed!' : 'You Failed. Better Luck Next Time!';
        answerElements.innerHTML = resultMessage;
        answerElements.style.marginTop = "10px";
    }

}


// answerChecker
const answerChecker = (correct, button) =>{
    if(correct){
        ++score;
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-check');
        button.appendChild(icon);
        button.classList.add('correct');
    }else{
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-times');
        button.appendChild(icon);
        button.classList.add('wrong')
    }

    // when one option select then remaning option are disabled
    answerElements.querySelectorAll('button').forEach(button =>{
        button.disabled = true;
    })

}


// highlightCorrectAnswer when user click any wrong option
const highlightCorrectAnswer = () =>{
    const correctAnswerIndex = quizData[currentQuestionIndex].answers.findIndex(answer => answer.correct);
    const correctButton = answerElements.children[correctAnswerIndex];
    correctButton.classList.add('correct');

    let icon = document.createElement('i');
    icon.classList.add('fas', 'fa-check')
    correctButton.appendChild(icon)
}





// for nextbutton
nextButton.addEventListener('click', () => {

    bar();

    currentQuestionIndex++;
    loadQuestion();

    if (currentQuestionIndex === quizData.length - 1) {
        nextButton.innerText = 'Submit';
    }
    if(currentQuestionIndex === quizData.length){
        nextButton.disabled = true;
        nextButton.style.display = 'none';
        resetButton.style.display = 'block';
        question_index.innerText = '';
    }

});


// resetQuiz
resetButton.addEventListener('click', ()=>{
    resetQuiz();
})


 function resetQuiz() {
    // Reset the quiz to the initial
    currentQuestionIndex = 0;
    questionElement.textContent='';
    answerElements.textContent='';
    nextButton.innerText = 'Next';
    nextButton.style.display = 'block';
    resetButton.style.display = 'none';
    nextButton.disabled = false;
    score = 0;
    progressBar.style.width = '0';

    timerLeft = totalQuizTime;
    // Stop the previous timer interval if any
    clearInterval(timerInterval);
    quizEnded = false;

    loadQuestion();
    startTimer();
 }


 //  add progressBar in top of quiz contaoner
 const progressBar = document.querySelector('.bar');

 function bar(){
    let barIndex = currentQuestionIndex;
    const progress = ((barIndex + 1 ) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    // when bar width 100% then apply radius in right border
    if (progress === 100) {
        progressBar.style.borderTopRightRadius = '8px';
    }else{
        progressBar.style.borderTopRightRadius = '0';
    }
}


 document.getElementById('start-quiz').addEventListener('click', ()=>{
    document.getElementById('start-quiz').style.display = 'none';
    document.querySelector('.quiz').style.display = 'block';

    //  load question and option when quiz start
    loadQuestion();
    // quiz timer start
    startTimer()
});

