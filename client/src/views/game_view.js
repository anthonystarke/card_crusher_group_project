const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../helpers/request_helper.js")
const RenderView = require('./render_view.js');


const GameView = function (startButton) {
  this.startButton = startButton;
};

GameView.prototype.bindEvents = function () {

  this.startButton.addEventListener('submit',(evt) => {
    evt.preventDefault();
    const userName = evt.target.username.value;
    PubSub.publish("GameView:Start-Game",userName);
    const startWrapper = document.getElementById('start-wrapper')
    // document.body.removeChild(startWrapper)
    startWrapper.parentNode.removeChild(startWrapper)
  })

  PubSub.subscribe("GameModel:Sending-PlayerData", (evt) => {
    this.renderPlayers(evt.detail);
    this.renderStage(evt.detail);
    this.renderTable(evt.detail);
  });

  PubSub.subscribe("GameModel:GameEnd", (evt) =>{
    const wrapper = document.getElementById('wrapper');
    wrapper.parentNode.removeChild(wrapper);
    this.renderEndGame(evt.detail);
    // only has win or lose
  });
}

GameView.prototype.renderPlayers = function (players){

  const player1 = players.player1;
  const player2 = players.player2;

  const playerOneBase = document.querySelector('#player-one-charactor');
  const playerTwoBase = document.querySelector('#player-two-charactor');
  playerOneBase.innerHTML = '';
  playerTwoBase.innerHTML = '';

  const playerOneFace = document.createElement('div');
  playerOneFace.classList.add("player-one");
  playerOneFace.textContent = `Player One Health: ${player1.healthLeft()} - Energy: ${player1.energy} `;
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

GameView.prototype.renderPlayer1Card = function (playerOneStage, player1Hand, player1) {
  playerOneStage.innerHTML = '';
  const renderPlayerOneStageView = new RenderView(playerOneStage);
  player1Hand.forEach((card,index) => renderPlayerOneStageView.renderPlayerOneCard(playerOneStage, player1, card, index));
};

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

GameView.prototype.renderEndGame = function (endGameDets) {
  const endGameWrapper = document.querySelector('#end-wrapper');

  const endGame = new RenderView(endGameWrapper);
  endGame.renderEndGame(endGameDets);
};


module.exports = GameView;
