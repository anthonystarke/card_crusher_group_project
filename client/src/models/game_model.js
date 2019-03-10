const PlayerModel = require("./player_model.js");
const DeckModel = require("./deck_model.js");
const PubSub = require("../helpers/pub_sub.js");
const TurnPhaseModel = require("./turn_phase_model.js");

const GameModel = function(){

  this.turnPhase = new TurnPhaseModel();

  const deckModel = new DeckModel();
  this.intervalTimer = 0;
  this.deck = deckModel.startBuildingDeck();

  const player1Hand = deckModel.initializePlayerDecks(this.deck);
  const player2Hand = deckModel.initializePlayerDecks(this.deck);

  this.player1 = new PlayerModel(player1Hand,1);
  this.player2 = new PlayerModel(player2Hand,2);
  this.currentPlayer = new PlayerModel(player1Hand,1);

  this.flipCoin(this.player1,this.player2); //decide whos turn it is
  console.log(this.player1.getMyTurn(),this.player2.getMyTurn());
  // this.publishData(this.player1,this.player2);
}

GameModel.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:Start-Game',(evt)=>{

    this.turnPhase.startGame()
    console.log(this.turnPhase.getCurrentPhase());

    this.publishData(this.player1,this.player2);
    setInterval(()=>{this.mainLoopWithPhases()},250);
    // setInterval(()=>{this.mainGameLoop(this.player1,this.player2)},250);
  });
  PubSub.subscribe('GameView:Card-Clicked',(evt)=>{
    // this.playerAction(evt.detail,this.player1,this.player2);
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


GameModel.prototype.mainLoopWithPhases = function () {

  console.log(this.turnPhase.getCurrentPhase()); //start phase

    if(this.player1.getMyTurn() === true )
    {
      this.currentPlayer = new PlayerModel(this.player1.accessHand(),1);
    } else {
      this.currentPlayer = new PlayerModel(this.player2.accessHand(),2);
    };

  this.turnPhase.nextPhase();
  console.log(this.turnPhase.getCurrentPhase()); //draw phase

    const deckModel = new DeckModel();
    if (this.currentPlayer.accessHand().length <= 4) {
    this.currentPlayer.addCard(deckModel.getCard(this.deck));
    // this.currentplayer.getNewCard(false);
    this.updatePlayer()
    this.publishData(this.player1,this.player2);
    }

  this.turnPhase.nextPhase();
  console.log(this.turnPhase.getCurrentPhase()); //play1 phase

  PubSub.subscribe('GameView:Card-Clicked',(evt)=>{
    this.cardAction(evt.detail);
    this.updatePlayer()
    this.publishData(this.player1,this.player2);
  });

  this.turnPhase.nextPhase();
  console.log(this.turnPhase.getCurrentPhase()); //battle phase
  this.turnPhase.nextPhase();
  console.log(this.turnPhase.getCurrentPhase()); //play2 phase
  this.turnPhase.nextPhase();
  console.log(this.turnPhase.getCurrentPhase());//end phase

  this.player1.turnChange()

  this.turnPhase.nextPhase();
  console.log("xxxxxxxxxxx");
};

GameModel.prototype.updatePlayer = function () {
  const id = this.currentPlayer.getID()
  if(id === this.player1.getID()) {
    this.player1 = new PlayerModel(this.currentPlayer.accessHand(),this.currentPlayer.getID());
  } else {
    this.player2 = new PlayerModel(this.currentPlayer.accessHand(),this.currentPlayer.getID());
  };
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
    this.currentPlayer = player1
  }else{
    player2.setMyTurn(true);
    this.currentPlayer = player2
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

GameModel.prototype.cardAction = function(cardPos) //removed attacker & defender for testing
{
  const playerHand = this.currentPlayer.accessHand()
  const card = playerHand[cardPos];
  this.currentPlayer.moveToField(cardPos);
  // defender.takeDamage(card['attack']);
  // attacker.removeCard(cardPos);
  // this.changeTurns(attacker,defender);
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
