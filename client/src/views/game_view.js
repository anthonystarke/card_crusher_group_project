PubSub = require("../helpers/pub_sub.js");
RequestHelper = require("../helpers/request_helper.js")



const GameView = function () {

};


GameView.prototype.bindEvents = function () {


  PubSub.subscribe("GameModel:Sending-PlayerData", (evt) => {
    this.renderPlayers(evt.detail);
    this.renderCards(evt.detail);

  });


GameView.prototype.renderPlayers = function (players){

  const player1 = players.player1;
  const player2 = players.player2;

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



GameView.prototype.renderCards = function (players) {

  const player1 = players.player1;
  const player2 = players.player2;

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

    playerBox.addEventListener('click', (evt) => {
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

      PubSub.publish("GameView:Card-Clicked", cardPos )
    }
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



module.exports = GameView;
