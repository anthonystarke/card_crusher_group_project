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

  const nextTurn = document.querySelector('#next-turn-wrapper');
  nextTurn.addEventListener('click',(evt) => {

    this.changeTurns();

    this.player1.increaseMaxEnergy();
    this.player1.setEnergy(this.player1.getMaxEnergy());

    this.player1.getNewCard();

    this.playerCardCheck(this.player1)
    // this.playerCardCheck(this.player1);
    this.processingField(this.player1,this.player2);

    this.mainGameLoop(this.player1,this.player2)
    this.publishData(this.player1,this.player2);
  })
}

GameModel.prototype.changeTurns = function () {
  if (this.player1.getMyTurn() === true)
  {
    this.player1.setMyTurn(false);
    this.player2.setMyTurn(true);
  } else
  {
    this.player1.setMyTurn(true);
    this.player2.setMyTurn(false);
  }
};

GameModel.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:Start-Game',(evt)=>{

    this.publishData(this.player1,this.player2);
    this.mainGameLoop(this.player1,this.player2)
    // setInterval(() => {this.mainGameLoop(this.player1,this.player2)},250);
  });
  PubSub.subscribe('GameView:Card-Clicked',(evt) => {

    console.log(this.player1.getName(),'energy',this.player1.getEnergy());
    if(this.player1.getEnergy() > 0)
    {
      this.playerAction(evt.detail,this.player1,this.player2);
      this.publishData(this.player1,this.player2);
    }
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

  if (player.accessHand.length < 5 && player.getNewCardStatus() === true)
  {
    console.log("Drawing card");
    const deckModel = new DeckModel();
    player.addCard(deckModel.getCard(this.deck));
    player.getNewCard();
    this.publishData(this.player1,this.player2);
  }
};

GameModel.prototype.mainGameLoop = function (player1,player2) {

  if(player2.getMyTurn() === true)
  {

    // if(this.intervalTimer > 4)
    // {
      // this.intervalTimer = 0;
      this.aiAction(player2, player1);
      // this.playerCardCheck(player2);

    // } else {
    //   this.intervalTimer += 1;
    // }
  }
};

GameModel.prototype.flipCoin = function (player1,player2) {
  const choice = this.getRandomInt(2);
  if(choice === 0){
    player1.setMyTurn(true);
  }else{
    player2.setMyTurn(true);
  }
};

GameModel.prototype.playerAction = function(cardPos,attacker,defender){
    this.cardAction(cardPos,attacker,defender);
    attacker.reduceEnergy();
    console.log(attacker.getName(),'energy',attacker.getEnergy());

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
      console.log(defender.getName(),'Took damage',attackingCard['attack']);
      defender.takeDamage(attackingCard['attack']);
    }

    if(weakestCard['defence'] >= 0)
    {
      console.log(attacker.getName(),"Targetted: ",weakestCard['type']);

      const damageMulti = this.damageMultiplyer(attackingCard,weakestCard);

      console.log(attackingCard['type'],"battled",weakestCard['type']);

      weakestCard['defence'] -= (attackingCard['attack'] * damageMulti);
      if(weakestCard['defence'] <= 0){
        console.log(attacker.getName(),'killed: ',weakestCard['type']);
        defendingField = defendingField.filter((card)=>{
          if(card !== weakestCard){
            return card;
          }
        })
      }
    }
  })
  defender.updatePlayerField(defendingField);

  if (defender.healthLeft() <= 0){
    this.gameOver(attacker);
  }
};

GameModel.prototype.gameOver = function (winner) {

  PubSub.publish("GameModel:GameOutPut",winner.getName() === 'player2' ? 'Lose' : 'Win');

};

GameModel.prototype.cardAction = function(cardPos,attacker,defender)
{
  const playerHand = attacker.accessHand()
  const card = playerHand[cardPos];
  console.log(attacker.getName(),'Played',card['type']);
  attacker.moveToField(cardPos);

};

GameModel.prototype.getRandomInt = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

GameModel.prototype.aiAction = function(self,enemy){

  const randomChoice = this.getRandomInt(self.accessHand().length-1);
  this.playerCardCheck(self);

  this.cardAction(randomChoice,self,enemy);
  self.getNewCard();

  this.changeTurns();
  this.processingField(self,enemy);

  this.publishData(enemy,self);
};

module.exports = GameModel;
