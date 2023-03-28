var mainEl = document.querySelector("main");
var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#time-el");

var interval;
var time = 60;
var questionIndex = 0;
var lastQuestionCorrect = '';

var questions = [
    {
        questionText: "What is 9 x 9?",
        questionChoices: ["18", "Fish", "81"],
        correctAnswer: 2
    },
    {
        questionText: "What is 12 x 12?",
        questionChoices: ["24", "144", "0", "Salmon"],
        correctAnswer: 1
    }
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
    mainEl.appendChild(btnDivEl);

    
    // btnDivEl.addEventListener("click", function(event) {
    //     var target = event.target;
        
    //     if (target.getAttribute("class") !== 'btn') return;
        
    //     var clickedQuestionIndex = parseInt(target.getAttribute("data-index"));
        
    //     console.log(clickedQuestionIndex);
    //     if (clickedQuestionIndex === questions[questionIndex].correctAnswer) {
    //         lastQuestionCorrect = "Correct"
    //     } else {
    //         time = time - 10;
    //         lastQuestionCorrect = "Incorrect"
    //     }
        
    //     questionIndex++;
        
    //     displayQuestion();
        
    // });

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



function endgame() {
    clearInterval(interval);
};