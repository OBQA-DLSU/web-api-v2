const InvitationHelper = require('../helpers/invitation.helper');
const ErrorHelper = require('../helpers/error.helper');

const invitation = async (req, res, next) => {
  try {
    const { invitationItems } = req.body;
    let error = [], success = [];
    const result = await Promise.all(invitationItems.map(async(i) => {
      const { email, ProgramId, isAdmin, isStudent } = i;
      const RoleId = (i.RoleId === 3) ? 3 : 2;
      const getIC = await InvitationHelper.getCode(ProgramId, RoleId, isAdmin, isStudent);
      if (getIC.err) {
        return error.push(getIC.err);
      }
      console.log(getIC);
      const sendInvite = await InvitationHelper.invite(email, getIC.invitationCode);
      if (sendInvite.err) {
        return error.push(sendInvite.err);
      }
      success.push(sendInvite.message);
    }));
    req.data = {error, success};
    next();
  }
  catch (e) {
    next(ErrorHelper.serverError(e));
  }
}

module.exports = {
  invitation: invitation
};