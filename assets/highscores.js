var highScores = [];

function handleFormSubmit(event) {
  event.preventDefault();
  
  var initials = document.querySelector("#initials").value;
  
  // Store the user's initials and score in an object
  var userScore = {
    initials: initials,
    score: score
  };
  
  // Add the user's score to the array of high scores
  highScores.push(userScore);
  
  // Display the high scores on a new page or section of the HTML file
  createHighScorePage();
}

var formEl = document.querySelector("form");
formEl.addEventListener("submit", handleFormSubmit);