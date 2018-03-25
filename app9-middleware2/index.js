const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = 3000;
let data = require('./data.js');

const app = express();
app.use(bodyParser.json());

app.use(session({
  secret: 'qwertyuiop',
  saveUninitialized: true,
  resave: true,
}));

// Define your middleware function here (or in a separate middleware file if you like)
const auth = (req, res, next) => {
  if (!req.session.currentUser) {
    res.sendStatus(401);
  } else {
    next();
  }
};

// Do not touch this endpoint
app.post('/login', (req, res, next) => {
  req.session.currentUser = req.body.username;
  if (req.body.username) {
    res.status(200).send(`logged in as ${req.body.username}`);
  } else {
    res.status(200).send('please provide a username');
  }
});


app.get('/data', (req, res, next) => {
  res.status(200).json(data);
});

app.get('/data/:year', (req, res, next) => {
  const { year } = req.params;
  const results = data.filter(el => el.year === +year);

  res.status(200).json(results);
});

app.post('/data', auth, (req, res, next) => {
  data.push(req.body);
  res.status(200).json(data);
});

app.put('/data/:year', auth, (req, res, next) => {
  const year = parseInt(req.params.year, 4);
  data.filter((el, idx, arr) => {
    if (el.year === year) {
      const newArr = arr;
      newArr[idx] = req.body;
    }
  });
  res.status(200).json(data);
});

app.delete('/data/:year', auth, (req, res, next) => {
  const year = parseInt(req.params.year, 10);
  data = data.filter(el => el.year !== +year);
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
