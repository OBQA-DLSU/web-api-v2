const express = require('express');
require('express-async-errors');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const Db = require('./models');
const apiRoutes = require('./src/routes/');
const morgan = require('morgan');
const logger = require('morgan');
const cors = require('cors');
const ErrorMiddleware = require('./src/middlewares/error-handler/error.middleware');
const SuccessMiddleware = require('./src/middlewares/success-handler/success.middleware');
const chalk = require('chalk');
const TokenMiddleware = require('./src/middlewares/token/token.middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(logger('dev'));
app.use(morgan('combined'));
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(TokenMiddleware.tokenTrimmer);

apiRoutes(app);
app.use(ErrorMiddleware.boomError);
app.use(ErrorMiddleware.handleError);
app.use(SuccessMiddleware.handleSuccess);
Db.sequelize.sync()
.then(() => {
  app.listen(PORT, () => {
    console.log(chalk.blue(`Listening on PORT: ${PORT}`));
  });
})
.catch(function (err) {
  console.log(err);
});
