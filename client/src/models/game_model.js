const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");
const DbModel = require("./db_model.js");
const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require("../helpers/request_helper.js")

const GameModel = function(){
  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();

  const player1Hand = deckModel.initializePlayerDecks(this.deck);
  const player2Hand = deckModel.initializePlayerDecks(this.deck);

  this.player1 = new PlayerModel(player1Hand);
  this.player2 = new PlayerModel(player2Hand);

  this.flipCoin(this.player1,this.player2); //decide whos turn it is
  console.log(this.player1.getMyTurn(),this.player2.getMyTurn());
  // this.publishData(this.player1,this.player2);
  this.items = []
  this.request = new RequestHelper('/api/cardcrusher');
}

GameModel.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:Start-Game',(evt)=>{
  console.log(evt.detail);
    this.all();
    this.publishData(this.player1,this.player2);
    setInterval(()=>{this.mainGameLoop(this.player1,this.player2)},250);

  });

  PubSub.subscribe('GameView:Card-Clicked',(evt)=>{
    this.playerAction(evt.detail,this.player1,this.player2);
  });

  //pubsub starts game loop
};

GameModel.prototype.publishData = function (player1,player2) {
  const combine = {
    player1: player1,
    player2: player2
  };
  PubSub.publish("GameModel:Sending-PlayerData",combine);
  // console.log(combine);
};

GameModel.prototype.mainGameLoop = function (player1,player2) {
  const deckModel = new DeckModel();

  if(player1.getMyTurn() === true && player1.getNewCardStatus() === true)
  {
    player1.addCard(deckModel.getCard(this.deck));
    player1.getNewCard(false);
    this.publishData(this.player1,this.player2);
  }

  if(player2.getMyTurn() === true)
  {
    if(player2.getNewCardStatus() === true)
    {
      player2.addCard(deckModel.getCard(this.deck));
      player2.getNewCard(false);
      this.publishData(this.player1,this.player2);

    }
    if(this.intervalTimer > 6)
    {
      this.intervalTimer = 0;
      this.aiAction(player2, player1);
      this.publishData(player1,player2);
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

GameModel.prototype.all = function (playerName) {
  this.request
    .get()
    .then((listItems) => {
      this.items = listItems;
      console.log(this.items);
      PubSub.publish('DbModel:list-ready', this.items);
      const playersDetails = this.items;
      playersDetails.forEach((player) => {
        if(playerName === player.name) {
          this.update(playerDetail)
      } else {
        this.add(playerName)
      }
    })
  })
  .catch((err) => console.error(err));
};

GameModel.prototype.update = function (playerDetail) {
  const id = playerDetail._id;
  this.request
    .put(playerDetail, id)
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('DbModel:list-ready', this.items);
    })
  .catch((err) => console.error(err));
};

GameModel.prototype.add = function (playerName) {
  this.request
    .post(playerName)
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('DbModel:list-ready', this.items);
    })
  .catch((err) => console.error(err));
};


module.exports = GameModel;
