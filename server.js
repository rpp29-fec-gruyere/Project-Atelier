const express = require('express');
const bodyParser = require('body-parser');
const postBodyParser = bodyParser.json();
const getBodyParser = require('./helpers/getBodyParser');
const api = require('./helpers/apiHelper');

//
const app = express();
const PORT = 1235;

app.use(express.static('./client/dist'));
app.use(postBodyParser);
app.use(getBodyParser);

app.get('/direct-query', (req, res) => {
  console.log('[Server] GET request recieved at \'/direct-query\'.\nreq body:\n', req.body);
  api.fetch(req.body)
    .catch((error) => {
      console.log('[Server] API retrieval failed\n', error);
      res.send(404, {error: 'API unable to fulfill request as written'});
    })
    .then((data) => {
      console.log('[Server] API retrieval successful');
      res.send(data.data);
    });
});

app.get('/page-data', (req, res) => {
  console.log('[Server] GET request recieved at \'/page-data\'.\nreq body:\n', req.body);
  api.fetchAllData(req.body.params.id)
    .catch((error) => {
      console.log('[Server] API retrieval failed\n', error);
      res.send(404, {error: 'API unable to fulfill request as written'});
    })
    .then((data) => {
      console.log('[Server] API retrieval successful');
      res.send(data);
    });
});

<<<<<<< HEAD
app.listen(PORT, () => { console.log('Now listening on port 1235...'); });


module.exports = {
  app
};
=======
app.listen(PORT, () => { console.log(`Now listening on port ${PORT}...`); });
>>>>>>> 18f432f122465fdf8de156324f4b2f76e528b07c
