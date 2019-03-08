const PlayerModel = function(deck) {
  this.health = 50;
  this.playerDeck = deck;
  this.needNewCard = false;

}
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
