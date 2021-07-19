module.exports = (req, res, next) => {
  if (req.method === 'GET') {
    req.body = JSON.parse(Object.keys(req.query)[0]);
  }
  next();
};