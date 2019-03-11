const FieldModel = function() {
  this.field = {
    1: [],
    2: []
  };

  this.player1Field = [];
  this.player2Field = [];
};

FieldModel.prototype.getPlayer1Field = function () {
  return this.field[1]
};

FieldModel.prototype.getPlayer2Field = function () {
  return this.field[2]
};

FieldModel.prototype.playCard = function (card, player) {
  this.field[player].push(card);
};

module.exports = FieldModel;
