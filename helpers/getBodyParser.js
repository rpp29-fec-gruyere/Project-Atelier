module.exports = (req, res, next) => {
  if (req.method === 'GET') {
    req.body = {params: {}};
    req.body.endpoint = req.query.endpoint;
    delete req.query.endpoint;
    for (let key in req.query) {
      req.body.params[key] = req.query[key];
    }
  }
  next();
};