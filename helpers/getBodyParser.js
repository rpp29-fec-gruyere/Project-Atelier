module.exports = (req, res, next) => {
  if (req.method === 'GET') {
    // req.body = {};
    // req.body.path = req.query.endpoint;
    // delete req.query.endpoint;
    // req.body.params = req.query;
    req.body = JSON.parse(Object.keys(req.query)[0]);
  }
  next();
};