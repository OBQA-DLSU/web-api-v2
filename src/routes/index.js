const authenticationRouter = require('./authentication.route');

module.exports = (app) => {
  app.get('/', welcomePage);
  app.use('/api/auth', authenticationRouter);
  app.get('*', unknownUrl);
};

function welcomePage (req, res, next) {
  res.status(200).send({ message: `OBQA API`, status: 1 });
}

function unknownUrl (req, res, next) {
  let err = new Error('Invalid URL');
  err.statusCode = 404;
  next(err);
}
