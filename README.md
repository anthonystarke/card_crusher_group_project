# Card Defender

Card Defender is Card Battle game based on Hearthstone and magic the gathering 3 different types of fighter cards and 3 different types of spell cards. Currently 1 player vs an AI opponent. 

The game is made as a full stack JavaScript application with an Express server and MongoDB database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Installing

Install dependencies:

```
npm install
```

Run a mongoDB server:

```
mongod
```

Seed the database:

```
mongo < server/db/seeds.js
```

Run webpack:

```
npm run build
```

Run express:

```
npm run server:dev
```

### Using

The application is running on port 300 so visit http://localhost:3000.
