PubSub = require("../helpers/pub_sub.js");
RequestHelper = require("../helpers/request.js")

RenderView = require("./render_view.js")

const GameView = function (container) {
  this.container = container;
};


GameView.prototype.bindEvents = function () {
  PubSub.subscribe("CardCrusher:cards-dealt",(cards)=>{
    const cardsAry =  cards.detail;
    this.container.innerHTML = '';
    this.render(cardsAry)
  });

}

GameView.prototype.render = function (cardsAry) {

  cardsAry.forEach((card)=>{
    const renderView = new RenderView(this.container)
    // renderView.render(item)
    // add an event listener to each card
  });
};


module.exports = GameView;
