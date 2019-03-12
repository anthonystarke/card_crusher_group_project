const RequestHelper = require("../helpers/request_helper.js")
const PubSub = require('../helpers/pub_sub.js');

const DbModel = function() {
this.items = []
this.request = new RequestHelper('/api/cardcrusher');
}

DbModel.prototype.publishPlayerData = function (data) {

    PubSub.subscribe("GameModel:Sending-PlayerData", (playerName)=> {
        console.log(playerName);
    const playerDetails = playerObject[`name:` `${playername}`, `score:` `${player1.score}`];
    this.all();
    for (let i = 0; i < ccCollection.length; i++) {
      const dataBaseName === ccCollection.name
      if (dataBaseName === playerName){
        this.update(playerDetails)
      } else {
        this.add(playerDetails)
        }
      }
    });
  }


DbModel.prototype.all = function() {
  this.request
    .get()
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('BucketList:list-ready', this.items);
    })
    .catch((err) => console.error(err));
};

DbModel.prototype.add = function(newItem) {
  this.request
    .post(newItem)
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('BucketList:list-ready', this.items);
    })
    .catch((err) => console.error(err));
};

DbModel.prototype.update = function(updatedItem) {
  const id = updatedItem._id;
  this.request
    .put(updatedItem, id)
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('BucketList:list-ready', this.items);
    })
    .catch((err) => console.error(err));
};

DbModel.prototype.delete = function(itemToDelete) {
  const id = itemToDelete._id;
  this.request
    .delete(id)
    .then((listItems) => {
      this.items = listItems;
      PubSub.publish('BucketList:list-ready', this.items);
    })
    .catch((err) => console.error(err));
};

module.exports = DbModel;
