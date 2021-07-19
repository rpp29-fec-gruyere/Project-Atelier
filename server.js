const express = require('express');
const bodyParser = require('body-parser');
const postBodyParser = bodyParser.json();
const getBodyParser = require('./helpers/getBodyParser');
const api = require('./helpers/apiHelper');

const app = express();
const PORT = 1235;

app.use(express.static('./client/dist'));
app.use(postBodyParser);
app.use(getBodyParser);

app.get('/direct-query', (req, res, next) => {
  console.log('[Server] Get request recieved.\nreq body:\n', req.body);
  api.fetch(req.body)
    .catch((error) => {
      console.log('[Server] API retrieval failed\n', error);
      res.send(404, {error: 'API unable to fulfill request as written'});
    })
    .then((data) => {
      res.send(data.data);
    });

});

app.listen(PORT, () => { console.log('Now listening on port 1235...'); });
