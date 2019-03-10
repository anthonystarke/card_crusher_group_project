PubSub = require("../helpers/pub_sub.js");
RequestHelper = require("../helpers/request_helper.js")

const GameView = function () {

  const startGame = document.querySelector('#start-game');
  startGame.addEventListener('click',() => {
    PubSub.publish("GameView:Start-Game",true);
  })
};

GameView.prototype.bindEvents = function () {
  PubSub.subscribe("GameModel:Sending-PlayerData", (evt) => {
    // console.log(evt.detail);
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

    const player1Hand = player1.accessHand();
    const player1Field = player1.accessField();
    const player2Hand = player2.accessHand();
    const player2Field = player2.accessField();

    player1Hand.forEach((card,index) => {
      const playerBox = document.createElement("div");
      playerBox.classList.add('playerCard');

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
        let cardPos;
        if(player1.getMyTurn() === true){
          if(evt.target.className.includes('card'))
          {
            cardPos = evt.target.parentNode.id
          } else {
            cardPos = evt.target.id
          }
        }

        PubSub.publish("GameView:Card-Clicked", cardPos )
      })
    })

    if(player1Field || player1Field.length > 0){

      player1Field.forEach((card,index) => {
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

    player2Hand.forEach((card,index) => {
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

    if(player2Field || player2Field.length > 0){

      player2Field.forEach((card,index) => {
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
}
  module.exports = GameView;
