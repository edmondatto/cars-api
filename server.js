const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config');

const app = express();

const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  message: 'Too many requests from this IP address. Try again in 15 minutes'
});
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(apiLimiter);

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.log(err);
  const database = client.db();
  require('./routes')(app, database);
  app.listen((port), () => {
    console.log('Listening on port 3000')
  });
});
