use card_crusher;
db.dropDatabase();

db.ccCollection.insertMany([
  {
    name: "Chika",
    winScore: 10,
    loseScore: 2
  },
  {
    name: "Anthony",
    winScore: 20,
    loseScore: 12
  },
  {
    name: "Hamish",
    winScore: 230,
    loseScore: 12
  }
]);
