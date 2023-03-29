var mainEl = document.querySelector("main");
var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#time-el");

var interval;
var score = 0;
var time = 100;
var questionIndex = 0;
var lastQuestionCorrect = '';

var questions = [
    {
        questionText: "What is 1 x 9?",
        questionChoices: ["10", "Fish", "9"],
        correctAnswer: 2
    },

    {
        questionText: "What is 2 x 9?",
        questionChoices: ["11", "18", "Chicken"],
        correctAnswer: 1
    },

    {
        questionText: "What is 3 x 9?",
        questionChoices: ["27", "12", "Dog"],
        correctAnswer: 0
    },

    {
        questionText: "What is 4 x 9?",
        questionChoices: ["Cat", "36", "13"],
        correctAnswer: 1
    },

    {
        questionText: "What is 5 x 9?",
        questionChoices: ["Pig", "14", "45"],
        correctAnswer: 2
    },

    {
        questionText: "What is 6 x 9?",
        questionChoices: ["54", "Cow", "15"],
        correctAnswer: 0
    },

    {
        questionText: "What is 7 x 9?",
        questionChoices: ["16", "63", "Horse"],
        correctAnswer: 1
    },

    {
        questionText: "What is 8 x 9?",
        questionChoices: ["Sheep", "72", "17"],
        correctAnswer: 1
    },

    {
        questionText: "What is 9 x 9?",
        questionChoices: ["81", "Goat", "18"],
        correctAnswer: 0
    },

    {
        questionText: "What is 10 x 9?",
        questionChoices: ["18", "Bunny", "90"],
        correctAnswer: 2
    },
];

function displayQuestion() {
    mainEl.innerHTML = "";

    if (questionIndex >= questions.length) {
        endgame();
        return;
    }
    
    var h1El = document.createElement('h1');
    h1El.textContent = questions[questionIndex].questionText;
    mainEl.appendChild(h1El);
    
    var btnDivEl = document.createElement("div");
    btnDivEl.style.display = "flex";
    btnDivEl.style.flexDirection = "column";
    btnDivEl.style.alignItems = "center";
    mainEl.appendChild(btnDivEl);

    var pEl = document.createElement('p');
    pEl.textContent = lastQuestionCorrect;
    mainEl.appendChild(pEl);
    
    for (var i = 0; i < questions[questionIndex].questionChoices.length; i++) {
        var buttonEl = document.createElement('button');
        buttonEl.textContent = questions[questionIndex].questionChoices[i]; 
        buttonEl.setAttribute("class", "btn");
        buttonEl.setAttribute("data-index", i);
        buttonEl.addEventListener("click", function(event) {
            var target = event.target;
            var clickedQuestionIndex = parseInt(target.getAttribute("data-index"));

            console.log(clickedQuestionIndex);
            if (clickedQuestionIndex === questions[questionIndex].correctAnswer) {
                lastQuestionCorrect = "Correct"
                score++;
            } else {
                time = time - 10;
                lastQuestionCorrect = "Incorrect"
            }

            questionIndex++;

            displayQuestion();

        });
        mainEl.appendChild(buttonEl);
    }
    
    
    
};

startBtnEl.addEventListener("click", function (event) {

    mainEl.innerHTML = "";

    interval = setInterval(function() {
        time--;
        timerEl.textContent = `Time: ${time}`;

        if (time <= 0) {
            clearInterval(interval);
            endgame();
            return;
        }


    }, 1000);

    displayQuestion();

});

function createHighScorePage() {
    mainEl.innerHTML = "";

    var h1El = document.createElement("h1");
    h1El.textContent = "High Scores";
    mainEl.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.textContent = "Your score: " + score;
    mainEl.appendChild(pEl);
}




function endgame() {
    clearInterval(interval);
    createHighScorePage();
};

