var highScores = [];
var scoresContainer = document.querySelector('.scoresContainer')

var scoresTable = document.querySelector('#row-scores');
var scoreName = document.querySelector('#nameTable');
var scoreSec = document.querySelector('#scoreTable');


//get local storage by storing prev highscores in array

function getHighScores() {
  highScores.push(JSON.parse(localStorage.getItem("highScores")))

  return highScores
}

//loop over array and display high scores in local storage
function listHighScores(value) {
  console.log(value)

  for(i = 0; i < value[0].length; i++) {
    console.log(value[0][i])

    var scoreDiv = document.createElement("tr")
    scoreDiv.addClass = 'row-scores'
    scoreName.innerHTML += ` ${value[0][i].name} <br>`
    scoreSec.innerHTML += ` ${value[0][i].score} <br>`

    scoresTable.appendChild(scoreDiv)

  }
}

listHighScores(getHighScores())



// function handleFormSubmit(event) {
//   event.preventDefault();
  
//   var initials = document.querySelector("#initials").value;
  
//   // Store the user's initials and score in an object
//   var userScore = {
//     initials: initials,
//     score: score
//   };
  
//   // Add the user's score to the array of high scores
//   highScores.push(userScore);
  
//   // Display the high scores on a new page or section of the HTML file
//   createHighScorePage();
// }

// var formEl = document.querySelector("form");
// formEl.addEventListener("submit", handleFormSubmit);