const GameModel = require('./models/game_model.js');
const GameView = require('./views/game_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const startForm = document.querySelector('#start-form');
  const gameView = new GameView(startForm);
  gameView.bindEvents();

  const gameModel = new GameModel();
  gameModel.bindEvents();


});
