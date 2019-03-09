const GameView = require('./views/game_view.js');
const CardCrusher = require('./models/card_crusher.js')


document.addEventListener('DOMContentLoaded', () => {

  const gameElement = document.querySelector("#cards-dealt");
  const gameView = new GameView(gameElement);
  console.log(gameView);
  gameView.bindEvents();

  const url = "http://localhost:3000/api/cardcrusher";
  const cardCrusher = new CardCrusher(url);
  console.log(cardCrusher);
  cardCrusher.bindEvents();
  cardCrusher.makeTheDeck();
});
