var mainEl = document.querySelector("main");
var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#time-el");
var formEl = document.querySelector(".form");


var interval;
var score = 0;
var time = 100;
var questionIndex = 0;
var lastQuestionCorrect = '';
var highScoresArr = []

var questions = [
    {
        questionText: "What type of Pokemon is Charizard?",
        questionChoices: ["Dragon", "Fire", "Water"],
        correctAnswer: 1
    },

    
    {
        questionText: "What type of Pokemon is Blastoise?",
        questionChoices: ["Water", "Turtle", "Grass"],
        correctAnswer: 0
    },
    
    {
        questionText: "What type of Pokemon is Venusaur?",
        questionChoices: ["Water", "Grass", "Leaf"],
        correctAnswer: 1
    },
    
    {
        questionText: "What type of Pokemon is Pikachu?",
        questionChoices: ["Normal", "Lightning", "Flying"],
        correctAnswer: 1
    },

    {
        questionText: "How many Pokemon total are in Generation 1?",
        questionChoices: ["365", "12", "151"],
        correctAnswer: 2
    },
];

//     {
//         questionText: "What is 6 x 9?",
//         questionChoices: ["54", "Cow", "15"],
//         correctAnswer: 0
//     },

//     {
//         questionText: "What is 7 x 9?",
//         questionChoices: ["16", "63", "Horse"],
//         correctAnswer: 1
//     },

//     {
//         questionText: "What is 8 x 9?",
//         questionChoices: ["Sheep", "72", "17"],
//         correctAnswer: 1
//     },

//     {
//         questionText: "What is 9 x 9?",
//         questionChoices: ["81", "Goat", "18"],
//         correctAnswer: 0
//     },

//     {
//         questionText: "What is 10 x 9?",
//         questionChoices: ["18", "Bunny", "90"],
//         correctAnswer: 2
//     },
// ];

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

    var pEl = document.createElement('p');
    pEl.textContent = lastQuestionCorrect;
    mainEl.appendChild(pEl);
    
    var buttonsContainer = document.createElement('div');
    buttonsContainer.addClass = 'buttonsContainer'
    buttonsContainer.style.display = "flex"
    buttonsContainer.style.justifyContent = "center"
    mainEl.appendChild(buttonsContainer);

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
        buttonsContainer.appendChild(buttonEl)
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
    //stop timer for quiz
    clearInterval(interval);

    //dunamically create form
    var form = document.createElement('form');

    var label = document.createElement('label');

    label.textContent = "Enter your initials for highscores:"
    label.style.color = "white";

    var input = document.createElement('input');
    input.setAttribute("id", 'initials')

    var button = document.createElement('button');
    button.textContent = "Submit"

    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(button)

    //append form to html because html innerHTML was cleared in display function
    mainEl.appendChild(form);

    
    button.addEventListener("click", function() {
        //save highscores to local storage
        var initials = input.value
    
        //GET ANY EXISTING HIGHSCORES
        var storedHighScores = JSON.parse(localStorage.getItem("highScores"))
        // if highscores exist in local storage update highscores arr
        if(storedHighScores !== null && storedHighScores.length > 0) {
            highScoresArr = storedHighScores
        }
    
        //set the current score in local storage
        var scoresObj =  {
            name: initials,
            score: time
        }
        //add current object to highscores array
        highScoresArr.push(scoresObj)
    
        localStorage.setItem('highScores', JSON.stringify(highScoresArr))
        event.preventDefault()
        location.href = "./highscores.html"
    })
    

    //createHighScorePage();
};


