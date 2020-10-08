module.exports = () => (req, res, next) => {
  const { type } = req.body;
  if (!type) {
    return res.status(400).send('Type field must be provided. Available types: \'books\'');
  }

  const baseUrl = req.url.slice(0, req.url.indexOf('/rate'));
  // change url from /rate to /:type/rate
  req.url = `${baseUrl}/${type}/rate`;
  // delete type field from body
  delete req.body.type;
  // call handler
  next();
};
