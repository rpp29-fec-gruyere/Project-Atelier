const express = require('express');
const bodyParser = require('body-parser');
const postBodyParser = bodyParser.json();
const getBodyParser = require('./helpers/getBodyParser');
const api = require('./helpers/apiHelper');

const app = express();

app.use(express.static('./client/dist'));
app.use(postBodyParser);
app.use(getBodyParser);

app.get('/direct-query', (req, res) => {
  //console.log('[Server] GET request recieved at \'/direct-query\'.\nreq body:\n', req.body);
  api.fetch(req.body)
    .catch((error) => {
      console.log('[Server] API retrieval failed\n', error);
      res.send(404, {error: 'API unable to fulfill request as written'});
    })
    .then((data) => {
      // console.log('[Server] API retrieval successful');
      res.send(data.data);
    });
});

app.get('/page-data', (req, res) => {
  // console.log('[Server] GET request recieved at \'/page-data\'.\nreq body:\n', req.body);
  api.fetchAllData(req.body.params.id)
    .catch((error) => {
      console.log('[Server] API retrieval failed\n', error);
      res.send(404, {error: 'API unable to fulfill request as written'});
    })
    .then((data) => {
      // console.log('[Server] API retrieval successful');
      res.send(data);
    });
});

app.post('/post-data', (req, res) => {
  console.log('POST recieved at \'/post-data\'\ncookies: ', req.cookies, '\nbody: ', req.body);
  api.post(req.body)
    .then((result) => {
      console.log('post successful', result);
    })
    .catch((err) => {
      console.log('post failed', err);
    });
});

module.exports = app;