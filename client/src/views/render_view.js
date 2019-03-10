const PubSub = require("../helpers/pub_sub.js");

const RenderView = function (container) {
  this.container = container;
};

RenderView.prototype.renderPlayerOneCard = function (playerOneStage, card, index) {
  const playerBox = document.createElement("div");
  playerBox.classList.add('playerCard')
  playerBox.setAttribute("id",index);
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
};

RenderView.prototype.renderPlayerTwoCard = function (playerTwoStage, card, index) {
  const playerBox = document.createElement("div");
  playerBox.classList.add('playerCard')
  playerBox.setAttribute("id",index);
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

};

RenderView.prototype.renderPlayerOneTable = function (playerOneTable, card, index) {
    const playerBox = document.createElement("div");
    playerBox.classList.add('playerCard')
    playerBox.setAttribute("id",index);
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
  }

RenderView.prototype.renderPlayerTwoTable = function (playerTwoTable, card, index) {
  const playerBox = document.createElement("div");
  playerBox.classList.add('playerCard')
  playerBox.setAttribute("id",index);
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

};

module.exports = RenderView;
