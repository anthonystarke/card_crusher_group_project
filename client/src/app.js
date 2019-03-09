const PlayerModel = require('./models/player_model.js');
const DeckModel = require('./models/deck_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log("Jscript Loaded");
  playerTurn = true;
  firstRound = true;

  initializeGame();

})

function initializeGame(){
  //needs to be moved to game model
  deckModel = new DeckModel();
  intervalTimer = 0;
  //needs to be moved to game model
  deck = deckModel.startBuildingDeck();

  const player1Deck = deckModel.initializePlayerDecks(deck);
  const player2Deck = deckModel.initializePlayerDecks(deck);

  const player1 = new PlayerModel(player1Deck);
  const player2 = new PlayerModel(player2Deck);

  flipCoin(player1,player2);

  const startGame = document.querySelector('#startGame');

  startGame.addEventListener('click',() => {
    // mainGameLoop(player1,player2);
    interval = setInterval(()=>{mainGameLoop(player1,player2)},250);
    startGame.remove();
  });
}

function mainGameLoop(player1,player2){

  console.log("Rendering");

  //add gamestatus checker here -> to stop game and choose winner
  //if game over -> render End screen with player stats

  if(player1.getMyTurn() === true && player1.getNewCardStatus() === true)
  {
    player1.addCard(deckModel.getCard(deck));
    player1.getNewCard(false);
  }

  renderCards(player1,player2);
  renderPlayers(player1,player2);

  if(player2.getMyTurn() === true)
  {
    if(player2.getNewCardStatus() === true)
    {
      player2.addCard(deckModel.getCard(deck));
      player2.getNewCard(false);
    }

    if(intervalTimer > getRandomInt(6))
    {
      intervalTimer = 0;
      aiAction(player2, player1);
      // renderCards(player1,player2);
      // renderPlayers(player1,player2);

      firstRound = false;
    } else {
      intervalTimer += 1;
    }
  }
}

function flipCoin(player1,player2){
  const choice = getRandomInt(2);

  if(choice === 0){
    player1.setMyTurn(true);
  }else{
    player2.setMyTurn(true);
  }
}

function playerAction(cardPos,attacker,defender){

    cardAction(cardPos,attacker,defender);
    // playerTurn = false;
    // playerTurnPassed = true;
    changeTurns(attacker,defender);
    // renderCards(player1,player2);
    // renderPlayers(player1,player2);
}

function changeTurns(endTurn,startTurn){
  endTurn.setMyTurn(false);
  startTurn.setMyTurn(true);
}

function cardAction(cardPos,attacker,defender)
{
  const playerDeck = attacker.accessDeck()
  const card = playerDeck[cardPos];
  attacker.moveToTD(cardPos);
  // defender.takeDamage(card['attack']);
  // attacker.removeCard(cardPos);
  changeTurns(attacker,defender);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function aiAction(self,enemy){
  const randomChoice = getRandomInt(self.accessDeck().length-1);
  cardAction(randomChoice,self,enemy);
  self.getNewCard(true);
  playerTurn = true;
}

function renderPlayers(player1,player2){

  const playerOneBase = document.querySelector('#player-one-charactor');
  const playerTwoBase = document.querySelector('#player-two-charactor');

  playerOneBase.innerHTML = '';
  playerTwoBase.innerHTML = '';

  const playerOneFace = document.createElement('div');
  playerOneBase.appendChild(playerOneFace);
  playerOneFace.classList.add("player-one");
  playerOneFace.textContent = `Player One Health: ${player1.healthLeft()}`;

  const playerTwoFace = document.createElement('div');
  playerTwoBase.appendChild(playerTwoFace);
  playerTwoFace.classList.add("player-two");
  playerTwoFace.textContent = `Player Two Health: ${player2.healthLeft()}`;
}

function createClickEvent(object,player1,player2){

  object.addEventListener('click', (evt) => {
    const deckModel = new DeckModel();

    if(player1.getMyTurn() === true){

      if(evt.target.className.includes('card'))
      {
        cardPos = evt.target.parentNode.id
        playerAction(cardPos,player1,player2)
      } else {
        cardPos = evt.target.id
        playerAction(cardPos,player1,player2)
      }
      player1.getNewCard(true);
      console.log(player1.getNewCardStatus());
      mainGameLoop(player1,player2);
    }
  })
}

function renderCards(player1,player2){

  const playerOneStage = document.querySelector("#player-one-container");
  const playerOneTable = document.querySelector('#player-one-table');

  const playerTwoStage = document.querySelector("#player-two-container");
  const playerTwoTable = document.querySelector('#player-two-table');

  playerOneStage.innerHTML = '';
  playerOneTable.innerHTML = '';

  playerTwoStage.innerHTML = '';
  playerTwoTable.innerHTML = '';

  const player1Deck = player1.accessDeck();
  const player1TD = player1.accessTD();

  const player2Deck = player2.accessDeck();
  const player2TD = player2.accessTD();

  player1Deck.forEach((card,index) => {
    const playerBox = document.createElement("div");
    playerBox.classList.add('playerCard')
    playerBox.setAttribute("id", index);
    playerOneStage.appendChild(playerBox);

    const cardName = document.createElement("h3");
    cardName.classList.add('cardName')
    cardName.textContent = card["type"];
    playerBox.appendChild(cardName);

    const cardAttack = document.createElement("h5");
    cardAttack.classList.add('cardAttack')
    cardAttack.textContent = `Attack ${card["attack"]}`;
    playerBox.appendChild(cardAttack);

    const cardDefence = document.createElement("h5");
    cardDefence.classList.add('cardDefence')
    cardDefence.textContent = `Defence ${card["defence"]}`;
    playerBox.appendChild(cardDefence);

    createClickEvent(playerBox,player1,player2);

  })

  if(player1TD || player1TD.length > 0){

    player1TD.forEach((card,index) => {

      const playerBox = document.createElement("div");
      playerBox.classList.add('playerCard')
      playerBox.setAttribute("id", index);
      playerOneTable.appendChild(playerBox);

      const cardName = document.createElement("h3");
      cardName.classList.add('cardName')
      cardName.textContent = card["type"];
      playerBox.appendChild(cardName);

      const cardAttack = document.createElement("h5");
      cardAttack.classList.add('cardAttack')
      cardAttack.textContent = `Attack ${card["attack"]}`;
      playerBox.appendChild(cardAttack);

      const cardDefence = document.createElement("h5");
      cardDefence.classList.add('cardDefence')
      cardDefence.textContent = `Defence ${card["defence"]}`;
      playerBox.appendChild(cardDefence);
    })
  }

  player2Deck.forEach((card,index) => {
    const playerBox = document.createElement("div");
    playerBox.classList.add('playerCard')
    playerBox.setAttribute("id", index);
    playerTwoStage.appendChild(playerBox);

    const cardName = document.createElement("h3");
    cardName.classList.add('cardName')
    cardName.textContent = card["type"];
    playerBox.appendChild(cardName);

    const cardAttack = document.createElement("h5");
    cardAttack.classList.add('cardAttack')
    cardAttack.textContent = `Attack ${card["attack"]}`;
    playerBox.appendChild(cardAttack);

    const cardDefence = document.createElement("h5");
    cardDefence.classList.add('cardDefence')
    cardDefence.textContent = `Defence ${card["defence"]}`;
    playerBox.appendChild(cardDefence);
  })

  if(player2TD || player2TD.length > 0){

    player2TD.forEach((card,index) => {

      const playerBox = document.createElement("div");
      playerBox.classList.add('playerCard')
      playerBox.setAttribute("id", index);
      playerTwoTable.appendChild(playerBox);

      const cardName = document.createElement("h3");
      cardName.classList.add('cardName')
      cardName.textContent = card["type"];
      playerBox.appendChild(cardName);

      const cardAttack = document.createElement("h5");
      cardAttack.classList.add('cardAttack')
      cardAttack.textContent = `Attack ${card["attack"]}`;
      playerBox.appendChild(cardAttack);

      const cardDefence = document.createElement("h5");
      cardDefence.classList.add('cardDefence')
      cardDefence.textContent = `Defence ${card["defence"]}`;
      playerBox.appendChild(cardDefence);
    })
  }
}
