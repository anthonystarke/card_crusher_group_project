const PlayerModel = require('./models/player_model.js');
const DeckModel = require('./models/deck_model.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log("Jscript Loaded");
  playerTurn = true;
  turns = 0;
  firstRound = true;

  initializeGame();

})

function initializeGame(){
  //needs to be moved to game model
  deckModel = new DeckModel();

  //needs to be moved to game model
  deck = deckModel.startBuildingDeck();

  const player1Deck = deckModel.initializePlayerDecks(deck);
  const player2Deck = deckModel.initializePlayerDecks(deck);

  const player1 = new PlayerModel(player1Deck);
  const player2 = new PlayerModel(player2Deck);

  const startProcess = document.querySelector('#startGame');


  startProcess.addEventListener('click',() => {
    // mainGameLoop(player1,player2)
    setInterval(()=>{mainGameLoop(player1,player2)},500);
  });
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function mainGameLoop(player1,player2){

  console.log("Rendering");

  renderCards(player1,player2);
  renderPlayers(player1,player2);

  if(playerTurn === false)
  {
    // if(firstRound === false){
    //   player2.addCard(deckModel.getCard(deck));
    // }

    aiAction(player2, player1);
    // sleep(1000);
    // mainGameLoop(player1,player2);
    firstRound = false;
  }
}

function playerAction(cardPos,attacker,defender){
    cardAction(cardPos,attacker,defender);
    playerTurn = false;
    playerTurnPassed = true;
}

function cardAction(cardPos,attacker,defender)
{
  const playerDeck = attacker.accessDeck()
  const card = playerDeck[cardPos];
  defender.takeDamage(card['attack']);
  attacker.removeCard(cardPos);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

function aiAction(self,enemy){
  const randomChoice = getRandomInt(self.accessDeck().length-1);
  cardAction(randomChoice,self,enemy);
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

function renderCards(player1,player2){

  const playerOneStage = document.querySelector("#player-one-container");
  const playerTwoStage = document.querySelector("#player-two-container");
  playerOneStage.innerHTML = '';
  playerTwoStage.innerHTML = '';

  const player1Deck = player1.accessDeck();
  const player2Deck = player2.accessDeck();

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

    playerBox.addEventListener('click', (evt) => {
      const deckModel = new DeckModel();

      if(playerTurn === true){

        if(evt.target.className.includes('card'))
        {
          cardPos = evt.target.parentNode.id
          playerAction(cardPos,player1,player2)
        } else {
          cardPos = evt.target.id
          playerAction(cardPos,player1,player2)
        }
        turn = 1;
        mainGameLoop(player1,player2);
      }
    })
  })

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
}
