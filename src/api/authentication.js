const UserHelper = require('../helpers/user.helper');
const ErrorHelper = require('../helpers/error.helper');
const InvitationCodeHelper = require('../helpers/invitationCode.helper');
const InvitationCodeService = require('../services/invitationCode.service');
const StudentHelper = require('../helpers/student.helper');
const InstructorHelper = require('../helpers/instructor.helper');
const JwtService = require('../services/jwt.service');
const Op = require('sequelize').Op;
const Db = require('../../models');

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

const signup = async (req, res, next) => {
  try {
    const { email, fname, lname, idNumber, password, confirmation, invitationCode } = req.body;
    // check for user
    const queryObject = { [Op.or]: [{email: email}, {idNumber: idNumber}] };
    const checkU = await Db.User.findOne({ where: queryObject });
    if (checkU && checkU.password) {
      return next(ErrorHelper.clientError('Email or ID Number is already in used', 422));
    }
    const getOutput = await InvitationCodeHelper.getDataFromInvitationCode(invitationCode);
    if (getOutput.err) {
      return next(ErrorHelper.clientError(getOutput.err, 422));
    }
    const code = getOutput.output.code;
    const convertedCode = InvitationCodeService.readCode(code);
    const { ProgramId, RoleId, isAdmin, isStudent } = convertedCode;

    // create user
    let user;
    if (checkU) {
      const updateU = await UserHelper.updateUser({id: checkU.id}, {email, fname, lname, idNumber, password});
      if (updateU.err) {
        return next(ErrorHelper.clientError(updateU.err, 422));
      }
      user = updateU.user;
    } else {
      const createU = await UserHelper.createUser({email, fname, lname, idNumber, password, RoleId: RoleId});
      if (createU.err) {
        return next(ErrorHelper.clientError(createU.err, 422));
      }
      user = createU.user;
    }
    const destroyDataFromInviationCode = await InvitationCodeHelper.destroyDataFromInvitationCode(invitationCode);
    if (isStudent === false) {
      const createI = await InstructorHelper.createInstructor({UserId: user.id, ProgramId, isAdmin, status: 'ACTIVE'});
      if (createI.err) {
        return next(ErrorHelper.clientError(createI.err, 422));
      }
    } else {
      const createS = await StudentHelper.createStudent({UserId: user.id, ProgramId, isAdmin, status: 'ACTIVE'});
      if (createS.err) {
        return next(ErrorHelper.clientError(createS.err, 422));
      }
    }
    const getUser = await UserHelper.getUserById(user.id);
    if (getUser.err) {
      return next(ErrorHelper.clientError(getUser.err, 401));
    }
    req.data = { user: getUser.user, token: JwtService.tokenForUser(getUser.user) };
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
};

module.exports = {
  signin: signin,
  signup: signup
};
