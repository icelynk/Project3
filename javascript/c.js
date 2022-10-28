const game = {
  audio: {
    computerWins: loadSound("ComputerWins.wav"),
    dealCard: loadSound("DealCard.ogg"),
    deckShuffle: loadSound("DeckShuffle.mp3"),
    flipCard: loadSound("FlipCard.ogg"),
    music: loadSound("music2.mp3"),
    newGame: loadSound("NewGame.wav"),
    playerCardLoses: loadSound("PlayerCardLoses.wav"),
    playerCardWins: loadSound("PlayerCardWins.wav"),
    playerWins: loadSound("PlayerWins.ogg"),
    taunt1: loadSound("taunt-1-deep-voice.wav"),
    taunt2: loadSound("taunt2.mp3"),
    taunt3: loadSound("taunt-3.wav"),
    taunt4: loadSound("taunt-4.mp3"),
    taunt5: loadSound("taunt-5.wav"),
    taunt6: loadSound("taunt-6.mp3"),
    taunt7: loadSound("taunt-7.wav"),
    taunt8: loadSound("taunt-8.mp3"),
    taunt9: loadSound("taunt.ogg"),
    taunt10: loadSound("taunt10.mp3"),
    taunt11: loadSound("taunt11.mp3"),
    taunt12: loadSound("taunt12.mp3"),
    tieBreaker: loadSound("TieBreaker.wav"),
  },
  music: {
    currentTrack: null,
  },
  settings: {
    musicVolume: 1,
  },

  deck: [],
  playerHand: [],
  computerHand: [],
  playerStage: [],
  computerStage: [],
  playerStageTieBreaker: [],
  computerStageTieBreaker: [],
};
//Create card suits
const suits = ["spades", "clubs", "diamonds", "hearts"];
//Create card values
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

//Music on
function music() {
  game.music.currentTrack = game.audio.music.cloneNode(true);
  game.music.currentTrack.volume = game.settings.musicVolume;
  game.music.currentTrack.play();
}

//New game
function newGame() {
  game.deck = [];
  game.playerHand = [];
  game.computerHand = [];
  game.playerStage = [];
  game.computerStage = [];
  game.playerStageTieBreaker = [];
  game.computerStageTieBreaker = [];
  playSound("newGame");
  generateDeck();
  updateStats();
  enableButton("flipCards");
  disableButton("nextRound");
  disableButton("tieBreaker");
}

//Enable button
function enableButton(id) {
  document.getElementById(id).removeAttribute("disabled");
}

//Disable button
function disableButton(id) {
  document.getElementById(id).setAttribute("disabled", "disabled");
}

// Generate deck
function generateDeck() {
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    const suit = suits[suitIndex];
    for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
      const value = values[valueIndex];

      const card = {
        flipped: false,
        suit: suit,
        value: value,
      };

      game.deck.push(card);
    }
  }
  shuffleDeck();
}

//Shuffle deck
function shuffleDeck() {
  const deckSize = game.deck.length;
  for (let cardIndex = 0; cardIndex < deckSize; cardIndex++) {
    const swappedCardIndex = Math.floor(Math.random() * deckSize);
    const currentCard = game.deck[cardIndex];
    const swappedCard = game.deck[swappedCardIndex];

    game.deck[cardIndex] = swappedCard;
    game.deck[swappedCardIndex] = currentCard;
  }
  playSound("deckShuffle");
  dealCards();
}

//Deal cards
function dealCards() {
  //Give cards to player
  //const playerCards = game.deck.splice(25, 26);
  const playerCards = game.deck.splice(0, 50);
  //Give cards to computer
  const computerCards = game.deck;

  game.playerHand = playerCards;
  game.computerHand = computerCards;
  game.deck = [];

  const delay = 2300;

  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      playSound("dealCard");
    }, 90 * i + delay);
  }
}

//Generate card
function generateCard(card, index) {
  //Parent card creation
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.classList.add(card.suit);
  const status = card.flipped ? "flipped" : "unflipped";
  cardEl.classList.add(status);
  if (index) {
    cardEl.setAttribute("style", `left: ${index * 50}px;`);
  }

  //Upper value element creation
  const upperValue = document.createElement("span");
  upperValue.classList.add("value");
  upperValue.classList.add(card.suit);
  upperValue.innerHTML = card.value;

  //Lower value element creation
  const lowerValue = document.createElement("span");
  lowerValue.classList.add("value");
  lowerValue.classList.add("bottom");
  lowerValue.classList.add(card.suit);
  lowerValue.innerHTML = card.value;

  //Add children to parent
  cardEl.appendChild(upperValue);
  cardEl.appendChild(lowerValue);

  //Return parent card with children
  return cardEl;
}

//Generate multiple cards from an array
function generateCards(cards, flipped) {
  const fragment = document.createDocumentFragment();

  cards.forEach((card, index) => {
    if (flipped) {
      card.flipped = true;
    }
    const generatedCard = generateCard(card, index + 1);
    fragment.appendChild(generatedCard);
  });
  return fragment;
}

//Flip player card
function flipPlayerCard() {
  //Get the first card from player hand
  const currentCard = game.playerHand.splice(0, 1)[0];
  //Set flipped status to true
  currentCard.flipped = true;
  //Add curent card to player stage
  game.playerStage.push(currentCard);
  //Generate the html for the current card
  const card = generateCard(currentCard);

  //Target the player stage
  const playerStage = document.getElementById("playerStage");
  //Insert current card html into player stage
  playerStage.appendChild(card);
  playSound("flipCard");
  flipComputerCard();
}

//Flip computer card
function flipComputerCard() {
  //Get the first card from computer hand
  const currentCard = game.computerHand.splice(0, 1)[0];
  //Set flipped status to true
  currentCard.flipped = true;
  //Add curent card to computer stage
  game.computerStage.push(currentCard);
  //Generate the html for the current card
  const card = generateCard(currentCard);

  //Target the computer stage
  const computerStage = document.getElementById("computerStage");
  //Insert current card html into computer stage
  computerStage.appendChild(card);
  playSound("flipCard");
  compareCards(false);
}

//Compare cards
function compareCards(gatherCards) {
  const currentPlayerCard = game.playerStage[0];
  const currentComputerCard = game.computerStage[0];
  const currentPlayerCardIndex = values.indexOf(currentPlayerCard.value);
  const currentComputerCardIndex = values.indexOf(currentComputerCard.value);

  disableButton("flipCards");
  enableButton("nextRound");
  disableButton("tieBreaker");

  if (currentPlayerCardIndex > currentComputerCardIndex) {
    document.getElementById("outcome").innerHTML = "Player Card Wins";
    if (gatherCards) {
      addCards("playerHand");
    } else {
      playSound("playerCardWins");
    }
  } else if (currentComputerCardIndex > currentPlayerCardIndex) {
    document.getElementById("outcome").innerHTML = "Computer Card Wins";
    if (gatherCards) {
      addCards("computerHand");
    } else {
      playSound("playerCardLoses");
      playTaunt();
    }
  } else {
    document.getElementById("outcome").innerHTML = "Tie";
    disableButton("flipCards");
    disableButton("nextRound");
    enableButton("tieBreaker");
    playSound("tieBreaker");
  }
}

function updateStats() {
  const playerCardCount =
    game.playerHand.length +
    game.playerStage.length +
    game.playerStageTieBreaker;
  const computerCardCount =
    game.computerHand.length +
    game.computerStage.length +
    game.computerStageTieBreaker;

  document.getElementById("playerCardCount").innerHTML = playerCardCount;
  document.getElementById("computerCardCount").innerHTML = computerCardCount;
}

function tieBreaker() {
  clearStage();

  enableButton("flipCards");
  disableButton("nextRound");
  disableButton("tieBreaker");

  if (game.playerStage.length > 0) {
    const playerRunOff = document.getElementById("playerRunOff");
    const computerRunOff = document.getElementById("computerRunOff");

    //Move player cards
    const playerStageCard = game.playerStage.splice(0)[0];
    game.playerStageTieBreaker.push(playerStageCard);
    playerRunOff.appendChild(generateCard(playerStageCard));

    const playerCards = game.playerHand.splice(0, 3);
    game.playerStageTieBreaker = game.playerStageTieBreaker.concat(playerCards);
    playerRunOff.appendChild(generateCards(playerCards, true));

    //Move computer cards
    const computerStageCard = game.computerStage.splice(0)[0];
    game.computerStageTieBreaker.push(computerStageCard);
    computerRunOff.appendChild(generateCard(computerStageCard));

    const computerCards = game.computerHand.splice(0, 3);
    game.computerStageTieBreaker =
      game.computerStageTieBreaker.concat(computerCards);
    computerRunOff.appendChild(generateCards(computerCards, true));

    //If player has no more cards the other player wins
    checkWinConditions();
  }
}

function collect() {
  if (game.playerStage.length > 0) {
    compareCards(true);
    enableButton("flipCards");
    disableButton("nextRound");
    disableButton("tieBreaker");
    checkWinConditions();
  }
}

//Add cards to hand
function addCards(hand) {
  const stageCards = game.computerStage
    .splice(0)
    .concat(game.playerStage.splice(0))
    .concat(game.playerStageTieBreaker.splice(0))
    .concat(game.computerStageTieBreaker.splice(0));
  console.log(stageCards);
  game[hand] = game[hand].concat(stageCards);
  console.log(hand);
  clearStage();
  updateStats();
}

function clearStage() {
  document.getElementById("computerStage").innerHTML = "";
  document.getElementById("computerRunOff").innerHTML = "";
  document.getElementById("playerStage").innerHTML = "";
  document.getElementById("playerRunOff").innerHTML = "";
}

//Check win conditions
function checkWinConditions() {
  if (game.playerHand.length === 0) {
    playSound("computerWins");
    //Computer wins
    openWinBanner("You Lose", "Try again?");
  } else if (game.computerHand.length === 0) {
    playSound("playerWins");
    //Player wins
    openWinBanner("You Win", "You're the man");
  }
}

function closeOverlay() {
  document.getElementById("overlay").style.display = "none";
}

function openWinBanner(title, message) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("settings").style.display = "none";
  document.getElementById("winBanner").style.display = "block";
  document.getElementById("winBannerTitle").innerHTML = title;
  document.getElementById("winBannerMessage").innerHTML = message;

  disableButton("flipCards");
}

function loadSound(filename) {
  const audio = new Audio(`./audio/war/${filename}`);
  audio.preload = "auto";
  audio.load();
  return audio;
}

function playSound(filename) {
  game.audio[filename].cloneNode(true).play();
}

function playTaunt() {
  const taunts = [
    "taunt1",
    "taunt2",
    "taunt3",
    "taunt4",
    "taunt5",
    "taunt6",
    "taunt7",
    "taunt8",
    "taunt9",
    "taunt10",
    "taunt11",
    "taunt12",
  ];
  const taunt = taunts[Math.floor(Math.random() * taunts.length)];
  playSound(taunt);
}

function toggleSettings() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("settings").style.display = "block";
  document.getElementById("winBanner").style.display = "none";
}

function setMusicVolume() {
  const musicInput = document.getElementById("musicVolume");
  console.log("volume", musicInput.value);
  game.settings.musicVolume = musicInput.value / 100;
  game.music.currentTrack.volume = game.settings.musicVolume;
}
