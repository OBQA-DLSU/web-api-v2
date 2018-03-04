const authenticationRouter = require('./authentication.route');
const invitationRouter = require('./invitation.route');

module.exports = (app) => {
  app.get('*', unknownUrl);
  app.get('/', welcomePage);
  app.use('/api/auth', authenticationRouter);
  app.use('/api/invitation', invitationRouter);
};

function welcomePage (req, res, next) {
  res.status(200).send({ message: `OBQA API`, status: 1 });
}

function unknownUrl (req, res, next) {
  let err = new Error('Invalid URL');
  err.statusCode = 404;
  next(err);
}
