const GameModel = require('./models/game_model.js');
const GameView = require('./views/game_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const startGame = document.querySelector('#start-game');
  const gameView = new GameView(startGame);
  gameView.bindEvents();

  const gameModel = new GameModel();
  gameModel.bindEvents();


});
