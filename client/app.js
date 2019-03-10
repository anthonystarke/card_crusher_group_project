const GameModel = require('./models/game_model.js');
const GameView = require('./views/game_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const gameModel = new GameModel();
  gameModel.bindEvents();

  const gameView = new GameView();
  gameView.bindEvents();

});
