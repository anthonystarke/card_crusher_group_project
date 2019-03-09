PubSub = require("../helpers/pub_sub.js");
RequestHelper = require("../helpers/request.js")

const RenderView = function (container) {
  this.container = container;
  this.status = status;
};


RenderView.prototype.render = function (cards, gameOverStatus, winStatus) {
  if (gameOverStatus == true){
    // do something
    //if out of time or out of lives
    // render "GAME OVER OUT OF TIME YOU LOSE!!"
    //else render "GAMOE OVER YOU WIN"

  }else {
    // render the card
  }
};


module.exports = RenderView;
