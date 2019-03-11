const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js")
const RenderView = require('./render_view.js');


const GameView = function (element) {
  this.element = element;
};

GameView.prototype.bindEvents = function () {

  this.element.addEventListener('click',() => {
    PubSub.publish("GameView:Start-Game",true);
  })

    PubSub.subscribe("GameModel:Sending-PlayerData", (evt) => {
    console.log(evt.detail);
    this.renderPlayers(evt.detail);
    this.renderStage(evt.detail);
    this.renderTable(evt.detail);
  });

GameView.prototype.renderPlayers = function (players){

    const player1 = players.player1;
    const player2 = players.player2;

    const playerOneBase = document.querySelector('#player-one-charactor');
    const playerTwoBase = document.querySelector('#player-two-charactor');
    playerOneBase.innerHTML = '';
    playerTwoBase.innerHTML = '';

    const playerOneFace = document.createElement('div');
    playerOneFace.classList.add("player-one");
    playerOneFace.textContent = `Player One Health: ${player1.healthLeft()}`;
    playerOneBase.appendChild(playerOneFace);

    const playerTwoFace = document.createElement('div');
    playerTwoFace.classList.add("player-two");
    playerTwoFace.textContent = `Player Two Health: ${player2.healthLeft()}`;
    playerTwoBase.appendChild(playerTwoFace);
  }

  GameView.prototype.renderStage = function (players) {
    const player1 = players.player1;
    const player2 = players.player2;

    const playerOneStage = document.querySelector("#player-one-container");
    const playerTwoStage = document.querySelector("#player-two-container");

    const player1Hand = player1.accessHand();
    this.renderPlayer1Card(playerOneStage, player1Hand, player1)

    const player2Hand = player2.accessHand();
    this.renderPlayer2Card(playerTwoStage, player2Hand)
  };

  GameView.prototype.renderTable= function (players) {
    const player1 = players.player1;
    const player2 = players.player2;

    const playerOneTable = document.querySelector('#player-one-table');
    const playerTwoTable = document.querySelector('#player-two-table');

    const player1Field = player1.accessField();
    this.renderPlayer1Table(playerOneTable, player1Field)
    const player2Field = player2.accessField();
    this.renderPlayer2Table(playerTwoTable, player2Field)
  };

<<<<<<< HEAD
    player1Hand.forEach((card,index) => {
      const playerBox = document.createElement("div");
      playerBox.classList.add('playerCard');
      playerBox.classList.add(card['type']);

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
=======
  GameView.prototype.renderPlayer1Card = function (playerOneStage, player1Hand, player1) {
    playerOneStage.innerHTML = '';
    const renderPlayerOneStageView = new RenderView(playerOneStage);
    player1Hand.forEach((card,index) => renderPlayerOneStageView.renderPlayerOneCard(playerOneStage, player1, card, index));
  };
>>>>>>> ad8f96bf837a11e3c54f4fc321dcf1d7407f2ccb


  GameView.prototype.renderPlayer2Card = function (playerTwoStage, player2Hand) {
    playerTwoStage.innerHTML = '';
    const renderPlayerTwoStageView = new RenderView(playerTwoStage)
    player2Hand.forEach((card,index) => renderPlayerTwoStageView.renderPlayerTwoCard(playerTwoStage, card, index));
  };

  GameView.prototype.renderPlayer1Table = function (playerOneTable, player1Field) {
    playerOneTable.innerHTML = '';
    if(player1Field || player1Field.length > 0){
      const renderPlayerOneTableView = new RenderView(playerOneTable)
      player1Field.forEach((card,index) => renderPlayerOneTableView.renderPlayerOneTable(playerOneTable, card, index));
    };
  };

  GameView.prototype.renderPlayer2Table = function (playerTwoTable, player2Field) {
    playerTwoTable.innerHTML = '';
    if(player2Field || player2Field.length > 0){
      const renderPlayerTwoTableView = new RenderView(playerTwoTable)
      player2Field.forEach((card,index) => renderPlayerTwoTableView.renderPlayerTwoTable(playerTwoTable, card, index));
    };
  };
};


module.exports = GameView;
