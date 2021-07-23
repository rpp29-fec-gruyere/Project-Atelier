const app = require('./expressApp.js');
const PORT = 1235;

app.listen(PORT, () => { console.log(`Now listening on port ${PORT}...`); });
