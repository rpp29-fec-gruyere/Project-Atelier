const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 1235;

app.use(express.static('./client/dist'));

app.listen(PORT, () => { console.log('Now listening on port 1235...') });
