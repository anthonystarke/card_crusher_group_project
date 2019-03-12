const DeckModel = function(){

}

DeckModel.prototype.getCard = function (deck) {
  const card = deck.splice(this.getRandomInt(deck.length),1)[0];
  return card;
};

DeckModel.prototype.getCardType = function () {

  const rand = this.getRandomInt(4)
  let cardName;
  switch (rand) {
    case 0:
      cardName = "Fighter";
      break;
    case 1:
      cardName = "Mage";
      break;
    case 2:
      cardName = "Rogue";
      break;
    }
    return cardName;
};

DeckModel.prototype.getCardAbilityType = function () {

  const rand = this.getRandomInt(2)
  return rand === 1 ? "active": "passive"
};

DeckModel.prototype.startBuildingDeck = function () {

  const deckOfCards = [];

  for(let i = 0; i < 50 ; i++)
  {
    const cardType = this.getCardType();
    const abilityType = this.getCardAbilityType();
    const randomHash = {
      type: cardType,
      attack: this.getRandomInt(5),
      defence: this.getRandomInt(5),
      abilities: abilityType
      }
    deckOfCards.push(randomHash);
  }
  return deckOfCards;
};

DeckModel.prototype.getRandomInt = function (max) {
  let value =  Math.floor(Math.random() * Math.floor(max));
  value === 0 ? value = 1: value = value;

  return value;
};

DeckModel.prototype.initializePlayerDecks = function (deck) {

  let newDeck = [];
  for(let i = 0;i <5; i++){
    let max = deck.length;
    const card = this.getRandomInt(max);

    newDeck.push(deck.splice(card,1));
    max -=1;
  }
  return newDeck.flat();
}

DeckModel.prototype.removeCardFromDeck = function (cardPos,deck) {

  deck.splice(cardPos,1);
  console.log(deck.length);
};

module.exports = DeckModel;
