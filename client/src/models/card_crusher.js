PubSub = require("../helpers/pub_sub.js");
Request = require("../helpers/request.js")

PlayerModel = require("./player_model.js")

const CardCrusher = function (url) {
  this.url = url;
  this.request = new Request(this.url);
};

CardCrusher.prototype.bindEvents = function () {
  PubSub.subscribe('GameView:card-click', (evt) => {
    console.log('in card crusher bind events');
    // deal with the card click
    playModel = new PlayModel()
  });
};

CardCrusher.prototype.makeTheDeck = function () {
  console.log("in makeTheDeck");
  // create a deck of cards

  // deal 5 cards each for player 1 and player 2
  // deal 5 should return an object with two elements - the five cards for each player

  //PubSub.publish("CardCrusher:cards-dealt", cards)
}


module.exports = CardCrusher;
