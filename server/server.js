// Todo Server code
const express = require('express');
const app = express();
const path = require('path');

const parser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

MongoClient.connect('mongodb://localhost:27017')
 .then((client) => {
   const db = client.db('bucketlist');
   const ccCollection = db.collection('ccCollection');
   const ccRouter = createRouter(ccCollection);
   app.use('/api/bucketlist', ccRouter);
 })
 .catch(console.err);

app.use(parser.json());

app.listen(3000, function () {
 console.log(`Listening on port ${ this.address().port }`);
});
