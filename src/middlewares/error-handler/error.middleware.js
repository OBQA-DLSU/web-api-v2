const chalk = require('chalk');

function handleError (err, req, res, next) {
  if (!err) {
    return next();
  }
  
  if (!err.statusCode) {
    err.statusCode = 500;
  }

  if (err.statusCode >= 500) {
    console.log(chalk.red(err.statusCode), err.message);
  } else if (err.statusCode >= 400 && err.statusCode < 500) {
    console.log(chalk.yellow(err.statusCode), err.message);
  }
  res.status(err.statusCode).send({status: 0, message: err.message});
}

module.exports = {
  handleError: handleError
};
