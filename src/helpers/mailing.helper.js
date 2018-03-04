const SendgridService = require('../services/sendgrid.service');
const BasicTemplates = require('../assets/mail-templates/basic-template');

function sendInvitation (email, invitationCode) {
  return new Promise(async(resolve, reject) => {
    try {
      const sender = 'noReply@gcoeInvitationTeam';
      const receiver = email;
      const subject = 'Invitation';
      const body = BasicTemplates.invitationMail(invitationCode, `${process.env.UI_LINK}/auth/signup`)
      const sendMail = await SendgridService.basicMail(sender, receiver, subject, body);
      if (sendMail.err) {
        return resolve({err: sendMail.err});
      }
      resolve({err: null});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  sendInvitation: sendInvitation
};