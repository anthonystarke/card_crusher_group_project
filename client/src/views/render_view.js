const PubSub = require("../helpers/pub_sub.js");

const RenderView = function (container) {
  this.container = container;
};


RenderView.prototype.renderWelcomeMessage = function (playerName) {
  // const welcomeBox = document.querySelector("welcome-message");
  // welcomeBox.classList.add('welcome');
  // welcomeBox.textContent = `Welcome ${playerName}`;

};

RenderView.prototype.renderPlayerOneCard = function (playerOneStage, player1, card, index) {
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
  this.cardSelect(playerBox, player1);
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

RenderView.prototype.cardSelect = function (playerBox, player1) {
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
  });
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
