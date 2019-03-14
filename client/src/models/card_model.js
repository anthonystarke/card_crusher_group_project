const CardModel = function(options){

  this.type = options['type'],
  this.attack = options['attack'],
  this.defence = options['defence'],
  this.abilities = options['abilities']

}

module.exports = CardModel;
