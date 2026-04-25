// Grabbbing The DOM Elements
let stoneBtn = document.querySelector(".stone"); 
let paperBtn = document.querySelector(".paper");
let scissorsBtn = document.querySelector(".scissors");
let startBtn = document.querySelector(".startBtn");    
let resetBtn = document.querySelector(".resetBtn");
let btnText = document.querySelector("#btnText");      
const displayArea = document.querySelector(".computer"); 
let playerScore = document.querySelector("#plyScrText");
let computerScore = document.querySelector("#compScrText");

// Disabling the gameplay buttons at the start. So User Won't Click Until Computer Is Ready.
stoneBtn.disabled = true;
paperBtn.disabled = true;
scissorsBtn.disabled = true;

// Variables To Track Scores
let pScore = 0;               //Player Score
let cScore = 0;               //Computer Score

// Global Variable For Computer's Move
let computerMove = "";

// Image URL's For Changing Images When Needed
const images = [                                                                      
  'url("/Web Dev/learn/images/stoneHand.png")',
  'url("/Web Dev/learn/images/paperHand.png")',
  'url("/Web Dev/learn/images/scissorsHand.jpeg")',
  'url("/Web Dev/learn/images/qm.jpg")'
];

// Start Button To Start Game
startBtn.addEventListener("click", () => {
  // Default Settings Implementation
  stoneBtn.removeAttribute("id");
  paperBtn.removeAttribute("id");
  scissorsBtn.removeAttribute("id");
  displayArea.removeAttribute("id");
  displayArea.style.backgroundImage = images[3]; 
  btnText.innerHTML = "";

  // I disabled the start button so that user can't double-click it
  startBtn.disabled = true;
  btnText.innerHTML = "Computer Is Choosing..."; 

  // I used Math.random here to make the computer pick a random move from the array.
  const moves = ["stone", "paper", "scissors"];
  computerMove = moves[Math.floor(Math.random() * moves.length)];

  let currentImageIndex = 0;
  
  displayArea.style.backgroundImage = images[currentImageIndex];

  // I used setInterval to change the image every 1 second to show 'thinking' animation
  const imageInterval = setInterval(() => {
    currentImageIndex++;

    if (currentImageIndex < images.length) {
      displayArea.style.backgroundImage = images[currentImageIndex];
    }

    if (currentImageIndex === images.length - 1) {
      clearInterval(imageInterval); 

      //styling to show computer has locked it's move
      setTimeout(() => {
        displayArea.setAttribute("id", "borderGrey");
        btnText.innerHTML = "Computer Has Locked Its Move<br>Choose Your Move";
        
        // buttons enabled for player to choose
        stoneBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
      }, 1000);
    }
  }, 1000);
});

function handlePlayerChoice(event) {
  // Disabling buttons to avoid double-clicking or multiple move choosing
  stoneBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;

  // used eent.currentTarget , applied styling to show user has chosen it's move
  const clickedButton = event.currentTarget;
  clickedButton.setAttribute("id", "borderGrey");

  // assigning strings to buttons
  let playerMove = "";
  if (clickedButton === stoneBtn) playerMove = "stone";
  else if (clickedButton === paperBtn) playerMove = "paper";
  else if (clickedButton === scissorsBtn) playerMove = "scissors";

  // Calculating The Result
  let result = "";
  if (playerMove === computerMove) {
    result = "tie";
  } else if (
    (playerMove === "stone" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "stone") ||
    (playerMove === "scissors" && computerMove === "paper")
  ) {
    result = "user";
  } else {
    result = "computer";
  }

  setTimeout(() => {
    // Changing Image To Reveal Computer's Choice
    let compImageIndex = 0;
    if (computerMove === "stone") compImageIndex = 0;
    else if (computerMove === "paper") compImageIndex = 1;
    else if (computerMove === "scissors") compImageIndex = 2;
    
    displayArea.style.backgroundImage = images[compImageIndex];

    // Applying Styling To Indicate The Winner / Tie State
    if (result === "user") {
      clickedButton.setAttribute("id", "borderGreen");
      displayArea.setAttribute("id", "borderRed");
      btnText.innerHTML = "You Won!";
      
      // Score Updation
      pScore++;
      playerScore.innerText = pScore;
      
    } else if (result === "computer") {
      clickedButton.setAttribute("id", "borderRed");
      displayArea.setAttribute("id", "borderGreen");
      btnText.innerHTML = "Computer Won!";
      
      // Score Updation
      cScore++;
      computerScore.innerText = cScore;
      
    } else {
      // Tie State
      clickedButton.setAttribute("id", "borderGrey");
      displayArea.setAttribute("id", "borderGrey");
      btnText.innerHTML = "Tied!";
    }

    // Enabling Start Button For Next Round
    startBtn.disabled = false;
    startBtn.innerHTML = "Play Again"; 
  }, 1000);
}

// I attached the player choice function I wrote above to the click events for all three buttons.
stoneBtn.addEventListener("click", handlePlayerChoice);
paperBtn.addEventListener("click", handlePlayerChoice);
scissorsBtn.addEventListener("click", handlePlayerChoice);

// For the reset button, I just tell the browser to refresh the whole page. It's the easiest way to wipe the slate clean and start over completely.
//It Works Exactly Like Resetting Score And Game
resetBtn.addEventListener("click", () => {
  window.location.reload();
});