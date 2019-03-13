const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");
const DbModel = require("./db_model.js");
const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require("../helpers/request_helper.js")

const GameModel = function(){

  this.gameEnd = false;
  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();
  this.turnCounter = 0;

  const player1Hand = deckModel.initializePlayerDecks(this.deck);
  const player2Hand = deckModel.initializePlayerDecks(this.deck);

  this.player1 = new PlayerModel(player1Hand,"Player1");
  this.player2 = new PlayerModel(player2Hand,"Player2");

  this.flipCoin(this.player1,this.player2); //decide whos turn it is
  console.log(this.player1.getMyTurn(),this.player2.getMyTurn());
  this.items = []
  this.request = new RequestHelper('/api/cardcrusher');

  const nextTurn = document.querySelector('#next-turn-wrapper');
  nextTurn.addEventListener('click',(evt) => {

    this.changeTurns();

    console.log("this.turnCounter % 3",this.turnCounter % 3);

    if(this.turnCounter % 3 === 0){
      this.player1.increaseMaxEnergy();
      console.log("Increase Max energy");
    }

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
  this.turnCounter += 1;
  console.log("turn counter",this.turnCounter);
};

GameModel.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:Start-Game',(evt)=>{

    this.player1.name = evt.detail;
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

GameModel.prototype.publishBattleLogs = function (battleLog) {
  PubSub.publish("GameModel:Publish-Logs",battleLog);
  console.log(battleLog);
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
      this.publishBattleLogs(`${defender.getName()} - Took damage: ${attackingCard['attack']}`)
      // console.log(defender.getName(),'Took damage',attackingCard['attack']);
      defender.takeDamage(attackingCard['attack']);
    }

    if(weakestCard['defence'] >= 0)
    {
      this.publishBattleLogs(`${attacker.getName()} - "Targetted: " ${weakestCard['type']}`);
      // console.log(attacker.getName(),"Targetted: ",weakestCard['type']);

      const damageMulti = this.damageMultiplyer(attackingCard,weakestCard);

      this.publishBattleLogs(`${attackingCard['type']} - "Battled: " ${weakestCard['type']}`);
      // console.log(attackingCard['type'],"battled",weakestCard['type']);

      weakestCard['defence'] -= (attackingCard['attack'] * damageMulti);
      if(weakestCard['defence'] <= 0){

        this.publishBattleLogs(`${attacker.getName()} - "killed: " ${weakestCard['type']}`);
        // console.log(attacker.getName(),'killed: ',weakestCard['type']);

        this.publishCardAnimation(weakestCard);

        defendingField = defendingField.filter((card)=>{
          if(card !== weakestCard){
            return card;
          }
        })
      }
    }
  })
  defender.updatePlayerField(defendingField);
  this.endGameCheck(defender)
  console.log(defender);
};

GameModel.prototype.publishCardAnimation = function (cardToAnimate){
  console.log("Card to animate",cardToAnimate['type']);
  PubSub.publish('GameModel:CardToAnimate');
}

GameModel.prototype.endGameCheck = function (defender) {

  if (defender.healthLeft() <= 0){
    this.gameOverPublish(defender);
    this.endGame = true;
  }
};

GameModel.prototype.gameOverPublish = function (winner) {

  let playerDetail = {}
  const score = winner;
  playerDetail.name = `${this.player1.name}`
    if(score.name === "player2"){
      playerDetail.winScore = 1;
      playerDetail.loseScore = 0;
    } else {
      playerDetail.winScore = 0;
      playerDetail.loseScore = 1;
    }

    this.all(playerDetail)

  PubSub.publish("GameModel:GameEnd",winner.getName() === 'player2' ? 'Lose' : 'Win');

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

GameModel.prototype.all = function (playerDetail) {
  const playerName = playerDetail.name
  this.request
    .get()
    .then((listItems) => {
      this.items = listItems;
      console.log(this.items);
      PubSub.publish('DbModel:list-ready', this.items);
      let updated = false
      this.items.forEach((player) => {
        if(playerName === player.name) {
          console.log("updateCalled");
          updated = true
          const newPlayerInfo = {
            _id: player._id,
            name: playerName,
            winScore: playerDetail.winScore + player.winScore,
            loseScore:playerDetail.loseScore + player.loseScore
          }
          this.update(newPlayerInfo)
      }
    })
      if (updated === false){
      this.add(playerDetail)
      }

    })
      .catch((err) => console.error(err));
  }


GameModel.prototype.update = function (playerDetail) {
  const id = playerDetail._id;
  console.log(id,playerDetail);
  this.request
    .put(id, playerDetail)
    .then((listItems) => {
      this.items = listItems;
      console.log(this.items);
      PubSub.publish('DbModel:list-ready', this.items);
    })
  .catch((err) => console.error(err));
};

GameModel.prototype.add = function (playerName) {
  this.request
    .post(playerName)
    .then((listItems) => {
      this.items = listItems;
      console.log(this.items);
      PubSub.publish('DbModel:list-ready', this.items);
    })
  .catch((err) => console.error(err));
};


module.exports = GameModel;
