const chalk = require('chalk');

function handleSuccess (req, res, next) {
  let message;
  if (!req.message) {
    message = 'Success';
  } else {
    message = req.message;
  }
  console.log(chalk.green('Success: ' + 200), message);
  res.status(200).send({status: 1, message: message, data: req.data});
}

module.exports = {
  handleSuccess: handleSuccess
};
