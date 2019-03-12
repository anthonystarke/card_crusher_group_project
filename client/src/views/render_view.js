const PubSub = require("../helpers/pub_sub.js");

const RenderView = function (container) {
  this.container = container;
};

RenderView.prototype.renderPlayerOneCard = function (playerOneStage, player1, card, index) {
  const playerBox = document.createElement("div");
  const cardType = card['type'].toLowerCase();
  const monsterClass = cardType.concat('_h_p1');

  playerBox.classList.add('playerCard');
  playerBox.classList.add(monsterClass);
  // playerBox.classList.add('displayHand');
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
  const cardType = card['type'].toLowerCase();
  const monsterClass = cardType.concat('_h_p2');
  playerBox.classList.add('playerCard');
  playerBox.classList.add(monsterClass);
  playerBox.classList.add('displayHand');
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
    const cardType = card['type'].toLowerCase();
    const monsterClass = cardType.concat('_f_p1');
    playerBox.classList.add('playerCard');
    playerBox.classList.add(monsterClass);
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
  const cardType = card['type'].toLowerCase();
  const monsterClass = cardType.concat('_f_p2');
  playerBox.classList.add('playerCard');
  playerBox.classList.add(monsterClass);
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

RenderView.prototype.renderEndGame = function (endGameDetails){
  this.container.innerHtml = "";

  // add left hand space
  const leftSideSpace = docuementSelector('div');
  leftSide.classList.add('left-side');
   this.container.appendChild(leftSide);

  // main contents
  // const endContents = document.querySelector('div');
  // endContents.classList.add('end-contents');
  //
  // const endContents = document.querySelector('div');
  // endContents.classList.add('end-contents');
  //
  // const endGame = document.createElement("div");
  // endGame.classList.add('title');
  // endGame.textContent = "Leader Board";
  //
  // this.container.appendChild(endGame);
  // endGameDetails.forEach((player) => {
  //   console.log(player);
  // });

  // add left hand space
  const rightSideSpace = docuementSelector('div');
  rightSide.classList.add('right-side');
   this.container.appendChild('rightSide');


}

module.exports = RenderView;
