const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");


const GameModel = function(){

  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();

  const player1Hand = deckModel.initializePlayerDecks(deck);
  const player2Hand = deckModel.initializePlayerDecks(deck);

  const player1 = new PlayerModel(player1Hand);
  const player2 = new PlayerModel(player2Hand);

  flipCoin(player1,player2); //decide whos turn it is

  // const startGame = document.querySelector('#startGame');
  // startGame.addEventListener('click',() => {
  //   interval = setInterval(()=>{mainGameLoop(player1,player2)},250);
  //   startGame.remove();
  // });

}

GameModel.prototype.bindEvents = function () {

  //pubsub starts game loop

};

GameModel.prototype.mainGameLoop = function (player1, player2) {

  if(player1.getMyTurn() === true && player1.getNewCardStatus() === true)
  {
    player1.addCard(deckModel.getCard(this.deck));
    player1.getNewCard(false);
  }
  //move these functions to an action!!!
  renderCards(player1,player2);
  renderPlayers(player1,player2);

  if(player2.getMyTurn() === true)
  {
    if(player2.getNewCardStatus() === true)
    {
      player2.addCard(deckModel.getCard(this.deck));
      player2.getNewCard(false);
    }
    if(intervalTimer > getRandomInt(6))
    {
      intervalTimer = 0;
      aiAction(player2, player1);
      firstRound = false;
    } else {
      intervalTimer += 1;
    }
  }
};

GameModel.prototype.flipCoin = function (player1,player2) {
  const choice = getRandomInt(3);
  if(choice === 0){
    player1.setMyTurn(true);
  }else{
    player2.setMyTurn(true);
  }
};

GameModel.prototype.playerAction(cardPos,attacker,defender){
    cardAction(cardPos,attacker,defender);
    changeTurns(attacker,defender);
};

GameModel.prototype.changeTurns(endTurn,startTurn){
  endTurn.setMyTurn(false);
  startTurn.setMyTurn(true);
};

GameModel.prototype.cardAction(cardPos,attacker,defender)
{
  const playerHand = attacker.accessHand()
  const card = playerHand[cardPos];
  attacker.moveToField(cardPos);
  // defender.takeDamage(card['attack']);
  // attacker.removeCard(cardPos);
  changeTurns(attacker,defender);
};

GameModel.prototype.getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

GameModel.prototype.aiAction(self,enemy){
  const randomChoice = getRandomInt(self.accessHand().length-1);
  cardAction(randomChoice,self,enemy);
  self.getNewCard(true);
};

module.exports = GameModel;
