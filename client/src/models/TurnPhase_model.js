

const TurnPhaseModel = function() {

  this.currentPhase = null

  this.phaseOrder = {
    start: "draw",
    draw: "play1",
    play1: "battle",
    battle: "play2",
    play2: "end",
    end: "start"
    };

};

TurnPhaseModel.prototype.startGame = function () {
  this.currentPhase === "start";
};

TurnPhaseModel.prototype.nextPhase = function () {
  this.currentPhase === this.phaseOrder[this.currentPhase];
};

TurnPhaseModel.prototype.overridePhase = function (chosenPhase) {
  this.currentPhase === chosenPhase;
};

TurnPhaseModel.prototype.getCurrentPhase = function () {
  return this.currentPhase;
}








module.exports = TurnPhaseModel;
