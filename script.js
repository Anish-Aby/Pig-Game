"use strict";

// selecting the html components
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const newGameButton = document.querySelector(".btn--new");
const playerOneCard = document.querySelector(".player--0");
const playerTwoCard = document.querySelector(".player--1");
let p1CurrentScore = document.querySelector("#current--0");
let p2CurrentScore = document.querySelector("#current--1");
let diceImg = document.querySelector(".dice");
let p1HoldScore = document.querySelector("#score--0");
let p2HoldScore = document.querySelector("#score--1");

// selecting the html components
let currentPlayer = 1;
let p1CurrentScoreSum = 0;
let p2CurrentScoreSum = 0;
let p1HoldScoreSum = 0;
let p2HoldScoreSum = 0;

// global reset
function resetAll() {
  p1CurrentScoreSum = 0;
  p2CurrentScoreSum = 0;
  p1HoldScoreSum = 0;
  p2HoldScoreSum = 0;
  p1HoldScore.textContent = 0;
  p2HoldScore.textContent = 0;
  p1CurrentScore.textContent = 0;
  p2CurrentScore.textContent = 0;
}

// reseting stats at start
resetAll();

// hold players score
function displayHoldScore() {
  if (p1HoldScoreSum >= 100) {
    playerOneCard.classList.add("player--winner");
  } else if (p2HoldScore >= 100) {
    playerTwoCard.classList.add("player--winner");
  }
  if (currentPlayer === 1) {
    p1HoldScoreSum += p1CurrentScoreSum;
    p1HoldScore.textContent = p1HoldScoreSum;
    resetCurrentScore();
  } else {
    p2HoldScoreSum += p2CurrentScoreSum;
    p2HoldScore.textContent = p2HoldScoreSum;
    resetCurrentScore();
  }
}

// generating random number
function getRandomNumber() {
  let randomNumber = Math.floor(Math.random() * 6) + 1;
  return randomNumber;
}

// toggle active player
function changePlayer() {
  if (currentPlayer === 1) {
    playerOneCard.classList.remove("player--active");
    playerTwoCard.classList.add("player--active");
    currentPlayer = 2;
  } else {
    playerTwoCard.classList.remove("player--active");
    playerOneCard.classList.add("player--active");
    currentPlayer = 1;
  }
}

// reset player current score
function resetCurrentScore() {
  if (currentPlayer === 1) {
    p1CurrentScoreSum = 0;
    p1CurrentScore.textContent = 0;
    changePlayer();
  } else {
    p2CurrentScoreSum = 0;
    p2CurrentScore.textContent = 0;
    changePlayer();
  }
}

// increase player score
function increaseScore(player, rollNumber) {
  if (player === 1) {
    p1CurrentScoreSum += rollNumber;
    p1CurrentScore.textContent = String(p1CurrentScoreSum);
  } else {
    p2CurrentScoreSum += rollNumber;
    p2CurrentScore.textContent = String(p2CurrentScoreSum);
  }
}

// event listener for roll button
rollDiceButton.addEventListener("click", function () {
  let rollNumber = getRandomNumber();
  diceImg.setAttribute("src", `./static/dice-${rollNumber}.png`);

  if (rollNumber == 1) {
    resetCurrentScore();
  } else {
    increaseScore(currentPlayer, rollNumber);
  }
});

// event listener for hold button
holdButton.addEventListener("click", displayHoldScore);

// event listener for reset button
newGameButton.addEventListener("click", resetAll);
