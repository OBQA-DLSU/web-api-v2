const authenticationRouter = require('./authentication.route');
const invitationRouter = require('./invitation.route');
const sopiRouter = require('./sopi.route');
const CourseRouter = require('./course.route');

module.exports = (app) => {
  app.get('/', welcomePage);
  app.use('/api/auth', authenticationRouter);
  app.use('/api/invitation', invitationRouter);
  app.use('/api/sopi', sopiRouter);
  app.use('/api/course', CourseRouter);
  // app.get('*', unknownUrl);
};

function welcomePage (req, res, next) {
  res.status(200).send({ message: `OBQA API`, status: 1 });
}

function unknownUrl (req, res, next) {
  let err = new Error('Invalid URL');
  err.error = 'URL ERROR';
  err.statusCode = 404;
  next(err);
}
