// Creating my players and setting up turn changes.
const playerOne = "Player 1";
const playerTwo = "Player 2";
const displayCurrPlayer = document.querySelector("#currPlayer");
let currPlayer = playerOne;

// Setting up my cards
let cardlist = [
  "Charlie_Brown",
  "Lucy",
  "Franklin",
  "Linus",
  "Marcie",
  "Peppermint_Patty",
  "Pigpen",
  "Sally",
  "Schroeder",
  "Snoopy_Woodstock",
];

let gameOver = false;
let cardStack;
let board = []; // Shows outlet of card placement.
// Placing Cards on the board.
let rows = 4;
let columns = 5;

let card1Chosen;
let card2Chosen;

window.onload = function () {
  shuffleCards();
  startGame();
};

// This function will make two of each card in the cardList.
function shuffleCards() {
  cardStack = cardlist.concat(cardlist);
  console.log(cardStack);
  // Make cards shuffle each time window reloads or game is reset.
  for (let c = 0; c < cardStack.length; c++) {
    let b = Math.floor(Math.random() * cardStack.length);
    // Will swap cards in a random spot on board each time game is reloaded.
    let swap = cardStack[c];
    cardStack[c] = cardStack[b];
    cardStack[b] = swap;
  }
  console.log(cardStack);
}

function startGame() {
  // Will create the 4x5 board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      let cardPic = cardStack.pop();
      row.push(cardPic);
      // Create img tags for cards.
      let card = document.createElement("img");
      card.id = r.toString() + "-" + c.toString();
      card.src = cardPic + ".png";
      card.classList.add("card");
      // Create an event listener here to flip over a card by clicking on it here:
      card.addEventListener("click", chooseCard);
      document.getElementById("board").append(card);
    }
    board.push(row);
  }
  console.log(board);
  //Create a function that will let you see cards before the game starts here:
  setTimeout(concealCards, 1000);
}

//Create the back of the cards
function concealCards() {
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < columns; c++) {
      let card = document.getElementById(r.toString() + "-" + c.toString());
      card.src = "back.png";
    }
}

function chooseCard() {
  // Make sure card is facing down when selected.
  if (this.src.includes("back")) {
    if (!card1Chosen) {
      card1Chosen = this;
      // Selecting correct placement of card.
      let coords = card1Chosen.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card1Chosen.src = board[r][c] + ".png";
    } else if (!card2Chosen && this != card1Chosen) {
      card2Chosen = this;

      let coords = card2Chosen.id.split("-");
      let r = parseInt(coords[0]);
      let c = parseInt(coords[1]);

      card2Chosen.src = board[r][c] + ".png";
      setTimeout(update, 1000);
    }
  }
}

function update() {
  //flips cards back over if they are not a match.
  if (card1Chosen.src != card2Chosen.src) {
    card1Chosen.src = "back.png";
    card2Chosen.src = "back.png";
    // player1Points += 1;
    // document.getElementById("player1Points").innerText = player1Points;
  }
  card1Chosen = null;
  card2Chosen = null;
}
