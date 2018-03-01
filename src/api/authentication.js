const UserHelper = require('../helpers/user.helper');
const ErrorHelper = require('../helpers/error.helper');
const JwtService = require('../services/jwt.service');

const signin = async (req, res, next) => {
  try {
    const user = await UserHelper.getUserById(req.user.id);
    if (user.err) {
      return next(ErrorHelper.clientError(user.err));
    }
    if (!user.user) {
      return next(ErrorHelper.clientError('Invalid User', 401));
    }
    req.data = { user: user.user, token: JwtService.tokenForUser(user.user) };
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

module.exports = {
  signin: signin
};
