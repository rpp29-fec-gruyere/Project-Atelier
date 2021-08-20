const express = require('express');
const bodyParser = require('body-parser');
const postBodyParser = bodyParser.json();
const getBodyParser = require('./helpers/getBodyParser');
const api = require('./helpers/apiHelper');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const app = express();

// app.use(express.static('./client/dist')); // used before serving compressed file

// serving up compress bundle.js using brotli
app.use('/', expressStaticGzip(path.join(__dirname, './client/dist'), {
  enableBrotli: true
}));
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
      console.log('post successful');
      res.status(201).end();
    })
    .catch((err) => {
      console.log('post failed', err.response);
      res.status(err.response.status).send({error: err.response.data});
    });
});

app.put('/put-data', (req, res) => {
  console.log('PUT recieved at \'/put-data\'\ncookies: ', req.cookies, '\nbody: ', req.body);
  api.put(req.body)
    .then((result) => {
      console.log('put successful');
      res.status(201).end();
    })
    .catch((err) => {
      console.log('put failed', err.response);
      res.status(err.response.status).send({error: err.response.data});
    });
});


module.exports = app;