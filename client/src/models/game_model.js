const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");
const PubSub = require('../helpers/pub_sub.js');

const GameModel = function(){

  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();

  const player1Hand = deckModel.initializePlayerDecks(this.deck);
  const player2Hand = deckModel.initializePlayerDecks(this.deck);

  const player1 = new PlayerModel(player1Hand);
  const player2 = new PlayerModel(player2Hand);

  this.flipCoin(player1,player2); //decide whos turn it is
  // this.publishData(player1,player2);

}

GameModel.prototype.bindEvents = function () {
  // PubSub.subscribe('',(evt)=>{
  //
  //
  // });
  //pubsub starts game loop

};

GameModel.prototype.publishData = function (player1,player2) {
  const combine = {
    player1: player1,
    player2: player2
  };
  PubSub.publish("GameModel:Sending-PlayerData");
  // console.log(combine);

};

GameModel.prototype.mainGameLoop = function (player1, player2) {

  if(player1.getMyTurn() === true && player1.getNewCardStatus() === true)
  {
    player1.addCard(deckModel.getCard(this.deck));
    player1.getNewCard(false);
  }

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
      this.aiAction(player2, player1);
      firstRound = false;
    } else {
      intervalTimer += 1;
    }
  }
};

GameModel.prototype.flipCoin = function (player1,player2) {
  const choice = this.getRandomInt(3);
  if(choice === 0){
    player1.setMyTurn(true);
  }else{
    player2.setMyTurn(true);
  }
};

GameModel.prototype.playerAction = function(cardPos,attacker,defender){
    this.cardAction(cardPos,attacker,defender);
    this.changeTurns(attacker,defender);
    this.publishData(attacker,defender);
};

GameModel.prototype.changeTurns = function(endTurn,startTurn){
  endTurn.setMyTurn(false);
  startTurn.setMyTurn(true);
};

GameModel.prototype.cardAction = function(cardPos,attacker,defender)
{
  const playerHand = attacker.accessHand()
  const card = playerHand[cardPos];
  attacker.moveToField(cardPos);
  // defender.takeDamage(card['attack']);
  // attacker.removeCard(cardPos);
  this.changeTurns(attacker,defender);
};

GameModel.prototype.getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

GameModel.prototype.aiAction = function(self,enemy){
  const randomChoice = this.getRandomInt(self.accessHand().length-1);
  this.cardAction(randomChoice,self,enemy);
  self.getNewCard(true);
  this.publishData(self,enemy);
  // this.mainGameLoop(self,enemy);
};

module.exports = GameModel;
