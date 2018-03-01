const serverError = (message, status = 500) => {
  let err = new Error(message);
  err.statusCode = status;
  return err;
};

const clientError = (message, status = 400) => {
  let err = new Error(message);
  err.statusCode = status;
  return err;
}

module.exports = {
  serverError: serverError,
  clientError: clientError
};
