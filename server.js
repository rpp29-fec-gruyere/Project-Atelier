const express = require('express');
const bodyParser = require('body-parser');
const apiHelper = require('./helpers/apiHelper');

const app = express();
const PORT = 1235;

app.use(express.static('./client/dist'));
app.use(bodyParser.json());


app.post('/', (req, res, next) => {
  console.log('[Server] Get request recieved.\nreq body:\n', req.body);
  res.status(200).end();
});

app.listen(PORT, () => { console.log('Now listening on port 1235...'); });


module.exports = {
  app
};