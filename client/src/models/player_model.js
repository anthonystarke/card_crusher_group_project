const PlayerModel = function(hand) {
  this.health = 10;
  this.playerHand = hand;
  this.playerField = []
  this.needNewCard = false;
  this.myTurn = false;

}

PlayerModel.prototype.moveToField = function (cardPos) {
  this.playerField.push(this.playerHand.splice(cardPos,1)[0]);
};

PlayerModel.prototype.accessField = function () {
  return this.playerField;
};
PlayerModel.prototype.getMyTurn = function () {
  return this.myTurn;
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
