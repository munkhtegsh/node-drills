require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 3000;
const app = express();


app.use(bodyParser.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_SESSION,
}));

app.post('/api/data', (req, res, next) => {
  if (!req.session.user) {
    req.session.user = [];
  }
  req.session.user.push(req.body);
  res.status(200).send(req.session.user);
  next();
});

app.get('/api/data', (req, res, next) => {
  res.status(200).send(req.session.user || 'no user yet');
  next();
});

app.listen(port, () => {
  console.log('listening to port ', port);
});
