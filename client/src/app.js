const GameModel = require('./models/game_model.js');
const GameView = require('./views/game_view.js');

document.addEventListener('DOMContentLoaded', () => {

  const gameModel = new GameModel();
  const gameView = new GameView();

  gameView.bindEvents();
  gameModel.bindEvents();



});
