const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public'))); // second public suppose to be server.js?

app.listen(4000, () => console.log(`Server is runnin on port: 4000`))

