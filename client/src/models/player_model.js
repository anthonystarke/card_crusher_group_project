const PlayerModel = function(hand,name) {
  this.health = 10;
  this.playerHand = hand;
  this.playerField = []
  this.needNewCard = false;
  this.myTurn = false;
  this.actions = 3;
  this.name = name;
  this.energy = 1;
  this.maxEnergy = 1;
}

PlayerModel.prototype.getEnergy = function () {
  return this.energy;
};

PlayerModel.prototype.setEnergy = function (value) {
  this.energy = value;
};

PlayerModel.prototype.reduceEnergy = function () {
  this.energy -= 1;
};

PlayerModel.prototype.getMaxEnergy = function () {
  return this.maxEnergy;
};

PlayerModel.prototype.increaseMaxEnergy = function () {
  this.maxEnergy += 1;
};

PlayerModel.prototype.getName = function () {
  return this.name;
};
PlayerModel.prototype.moveToField = function (cardPos) {
  this.playerField.push(this.playerHand.splice(cardPos,1)[0]);
};

PlayerModel.prototype.removeFromField = function (cardObject) {
  this.playerField = this.playerField.filter((card)=>{
    if(card != cardObject){
      return card;
    }
  });
};

PlayerModel.prototype.accessField = function () {
  return this.playerField;
};

PlayerModel.prototype.getMyTurn = function () {
  return this.myTurn;
};

PlayerModel.prototype.updatePlayerField = function (newField) {
  this.playerField = newField;
};
PlayerModel.prototype.setMyTurn = function (value) {
  this.myTurn = value;
};
PlayerModel.prototype.getNewCard = function (value) {
  this.needNewCard = value;
};

PlayerModel.prototype.getNewCardStatus = function () {
  return this.needNewCard;
};

PlayerModel.prototype.accessHand = function () {
  return this.playerHand;
};

PlayerModel.prototype.removeCard = function (cardPos) {
  this.playerHand.splice(cardPos,1);
};

PlayerModel.prototype.addCard = function (card) {
  this.playerHand.push(card);
};

PlayerModel.prototype.healthLeft = function () {
  return this.health;
};

PlayerModel.prototype.takeDamage = function (amount) {
  this.health -= amount;
};

module.exports = PlayerModel;
