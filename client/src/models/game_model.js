const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");
const PubSub = require('../helpers/pub_sub.js');

const GameModel = function(){

  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();

  const player1Hand = deckModel.initializePlayerDecks(this.deck);
  const player2Hand = deckModel.initializePlayerDecks(this.deck);

  this.player1 = new PlayerModel(player1Hand,"Player1");
  this.player2 = new PlayerModel(player2Hand,"Player2");

  this.flipCoin(this.player1,this.player2); //decide whos turn it is
  console.log(this.player1.getMyTurn(),this.player2.getMyTurn());
}

GameModel.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:Start-Game',(evt)=>{
    this.publishData(this.player1,this.player2);
    setInterval(() => {this.mainGameLoop(this.player1,this.player2)},250);
  });
  PubSub.subscribe('GameView:Card-Clicked',(evt) => {
    this.playerAction(evt.detail,this.player1,this.player2);
    this.publishData(this.player1,this.player2);
  });
};

GameModel.prototype.publishData = function (player1,player2) {
  const combine = {
    player1: player1,
    player2: player2
  };

  PubSub.publish("GameModel:Sending-PlayerData",combine);
};

GameModel.prototype.playerCardCheck = function (player) {
  if (player.getNewCardStatus() === true)
  {
    const deckModel = new DeckModel();
    player.addCard(deckModel.getCard(this.deck));
    player.getNewCard(false);
    this.publishData(this.player1,this.player2);
  }
};

GameModel.prototype.mainGameLoop = function (player1,player2) {

  if(player1.getMyTurn() === true)
  {
    this.playerCardCheck(player1)
  }

  if(player2.getMyTurn() === true)
  {
    this.playerCardCheck(player2);

    if(this.intervalTimer > 4)
    {
      this.intervalTimer = 0;
      this.aiAction(player2, player1);
    } else {
      this.intervalTimer += 1;
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
    attacker.getNewCard(true);
};

GameModel.prototype.changeTurns = function(endTurn,startTurn){
  endTurn.setMyTurn(false);
  startTurn.setMyTurn(true);
};

GameModel.prototype.returnWeakestCard = function (field) {
  return field.reduce((total,newCard) => {
    if(!total.hasOwnProperty('defence')){
      total = newCard;
      return total;
    }
    if(total['defence'] > newCard['defence'])
    {
      total = newCard;
    }
    return total
  },{})
};

GameModel.prototype.damageMultiplyer = function (attackingCard,defendingCard) {
  // let multiplyer;
  if (attackingCard['type'] === defendingCard['type'])
  {
    return 1;
  } else if(attackingCard['type'] === 'Fighter' && defendingCard['type'] === 'Rogue')
  {
    return 2;
  } else if(attackingCard['type'] === 'Rogue' && defendingCard['type'] === 'Mage')
  {
    return 2;
  } else if (attackingCard['type'] === 'Mage' && defendingCard['type'] === 'Fighter')
  {
    return 2;
  }
  return 1;
};

GameModel.prototype.processingField = function (attacker,defender) {

  const attackingField = attacker.accessField();
  let defendingField = defender.accessField();
  const deckModel = new DeckModel();

  let totalDamage = 0

  attackingField.forEach((attackingCard,index) => {

    totalDamage += attackingCard['attack'];

    const weakestCard = this.returnWeakestCard(defendingField);

    if(!weakestCard.hasOwnProperty('defence'))
    {
      defender.takeDamage(attackingCard['attack']);
    }

    if(weakestCard['defence'] >= 0)
    {
      const damageMulti = this.damageMultiplyer(attackingCard,weakestCard);

      weakestCard['defence'] -= (attackingCard['attack'] * damageMulti);

      if(weakestCard['defence'] <= 0){

        defendingField = defendingField.filter((card)=>{
          if(card !== weakestCard){
            return card;
          }
        })
      }
    }
  })
  defender.updatePlayerField(defendingField);
};

GameModel.prototype.cardAction = function(cardPos,attacker,defender)
{
  const playerHand = attacker.accessHand()
  const card = playerHand[cardPos];
  attacker.moveToField(cardPos);
  this.processingField(attacker,defender);
  this.changeTurns(attacker,defender);
};

GameModel.prototype.getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

GameModel.prototype.aiAction = function(self,enemy){
  const randomChoice = this.getRandomInt(self.accessHand().length-1);
  this.cardAction(randomChoice,self,enemy);
  self.getNewCard(true);
  this.publishData(enemy,self);
};

module.exports = GameModel;
