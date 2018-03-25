const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 3000;
const data = require('./data.js');

const app = express();

app.use(bodyParser.json());

app.use(session({
  secret: 'qwertyuiop',
  saveUninitialized: true,
  resave: true,
}));

app.use((req, res, next) => { // will run, everytime  in app.use();
  console.log('this is top level middleware');
  next();
});

app.post('/login', (req, res, next) => {
  req.session.currentUser = req.body.username;
  res.status(200).send('logged in');
});

app.get('/api/login', (req, res, next) => {
  console.log('hi');
  res.status(200).send(req.session.currentUser);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
