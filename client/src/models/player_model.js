const PlayerModel = function(deck) {
  this.health = 50;
  this.playerDeck = deck;

}

PlayerModel.prototype.accessDeck = function () {
  return this.playerDeck;
};

PlayerModel.prototype.removeCard = function (cardPos) {
  this.playerDeck.splice(cardPos,1);
};

PlayerModel.prototype.healthLeft = function () {
  return this.health;
};

PlayerModel.prototype.takeDamage = function (amount) {
  this.health -= amount;
};

module.exports = PlayerModel;
