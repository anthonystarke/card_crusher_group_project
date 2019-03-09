const PlayerModel = function(deck) {
  this.health = 10;
  this.playerDeck =  deck;
  this.playerTableDeck = []
  this.needNewCard = false;
  this.myTurn = false;

}

PlayerModel.prototype.moveToTD = function (cardPos) {
  this.playerTableDeck.push(this.playerDeck.splice(cardPos,1)[0]);
};

PlayerModel.prototype.accessTD = function () {
  return this.playerTableDeck;
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

PlayerModel.prototype.accessDeck = function () {
  return this.playerDeck;
};

PlayerModel.prototype.removeCard = function (cardPos) {
  this.playerDeck.splice(cardPos,1);
};

PlayerModel.prototype.addCard = function (card) {
  this.playerDeck.push(card);
};

PlayerModel.prototype.healthLeft = function () {
  return this.health;
};

PlayerModel.prototype.takeDamage = function (amount) {
  this.health -= amount;
};

module.exports = PlayerModel;
