const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data');

const port = 3000;
const app = express();
app.use(bodyParser.json());

app.get('/api/data', (req, res) => {
  res.status(200).send(data);
});

app.post('/api/data', (req, res) => {
  const { item } = req.body;
  data.push(item);
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});
