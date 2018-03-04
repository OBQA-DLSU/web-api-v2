const InvitationCodeHelper = require('../helpers/invitationCode.helper');
const MailingHelper = require('../helpers/mailing.helper');
const InvitationCodeService = require('../services/invitationCode.service');

function invite (email, invitationCode) {
  return new Promise(async(resolve, reject) => {
    const sendMail = await MailingHelper.sendInvitation(email, invitationCode);
    if (sendMail.err) {
      return resolve({err: sendMail.err});
    }
    resolve({err: null, message: 'Successfully sent email'});
  });
}

function getCode (ProgramId, RoleId, isAdmin, isStudent=false) {
  return new Promise(async(resolve, reject) => {
    try {
      const code = InvitationCodeService.convertToCode(ProgramId, RoleId, isAdmin, isStudent);
      if (!code) {
        return resolve({err: 'Invalid ProgramId or RoleId'});
      }
      const createIC = await InvitationCodeHelper.createCode(code);
      if (createIC.err) {
        return resolve({err: createIC.err});
      }
      resolve({err: null, invitationCode: createIC.invitationCode.invitationCode});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  invite: invite,
  getCode: getCode
};