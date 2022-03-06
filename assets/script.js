//Questions//
var questions = [{
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
},
{
    title: "Arrays in Javascript can be used to store ____.",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    title: "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
},
{
    title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console log"],
    answer: "console log"
}
]
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Start Button/Start Timer//
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;

    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        //When Timer Reaches 0, Game is Over//
        if (timeLeft === 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);

    next();
}

//When I Answer a Question, Then I Am Presented With Another Question
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        quizContent += buttonCode
    }


    document.getElementById("quizBody").innerHTML = quizContent;
}
//When I Answer a Question Incorrectly, Then Time is Subtracted From the Clock//
function incorrect() {
    timeLeft -=5; 
    next();
}

//When Game is Over, I Can Save My Initials and Score//
function endGame() {
    clearInterval(timer);

    var quizContent = `
    <h2>GAME OVER!</h2>
    <h3>You recieved a score of ` + score +  `/100!</h3>
    <input type="text" placeholder="Initials"> 
    <button onclick="setScore()">Save My Score!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}

//Save Score//

function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName",  document.getElementById('name').value);
    getScore();
}


function getScore() {
    var quizContent = `
    <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
    <h1>` + localStorage.getItem("highscore") + `</h1><br> 
    
    <button onclick="clearScore()">Clear Score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}
//Reset Game//
function resetGame() {
    clearInterval(timer);
    timeLeft = 0;
    timer;

    document.getElementById("timeLeft").innerHTML = timeLeft;
//Loops Back To Start//
    var quizContent = `
    <h1>
        JavaScript Quiz!
    </h1>
    <h3>
        Start Quiz!   
    </h3>
    <button onclick="start()">Begin!</button>`;

    document.getElementById("quizBody").innerHTML = quizContent;
}
