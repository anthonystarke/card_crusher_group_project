const GameModel = require('./models/game_model.js');
const GameView = require('./views/game_view.js');

document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  const startGame = document.querySelector('#start-game');
  const gameView = new GameView(startGame);
  gameView.bindEvents();

  const gameModel = new GameModel();
  gameModel.bindEvents();

=======
  const gameModel = new GameModel();
  gameModel.bindEvents();

  const gameView = new GameView();
  gameView.bindEvents();
>>>>>>> develop

});
