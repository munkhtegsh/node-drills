const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const data = require('./data.js');

const app = express();
app.use(bodyParser.json());

app.get('/api/data/x', (req, res) => { // why do I need to move it up?
  const { sex } = req.query;
  const people = data.filter((person) => {
    if (person.sex === sex) {
      return person;
    }
  });
  res.status(200).send(people);
});

app.get('/api/data', (req, res) => {
  res.status(200).send(data);
});

app.post('/api/data', (req, res) => {
  const { item } = req.body;
  data.push(item);
  res.status(200).send(data);
});

app.get('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const item = data.find((el, i) => {
    if (+id === i) {
      return el;
    }
  });
  res.status(200).send(item);
});

app.put('/api/data', (req, res) => {
  const { id } = req.query;
  const {
    job,
    sex,
    year,
    count,
    perc,
  } = req.body;
  const title = {
    job, sex, year, count, perc,
  };

  const mapped = data.map((person, i) => { // forEach didn't work
    if (i === +id) {
      person = title;
    }
    return person;
  });
  res.status(200).send(mapped);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
