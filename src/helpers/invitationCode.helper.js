const Db = require('../../models');

function getDataFromInvitationCode (invitationCode) {
  return new Promise(async(resolve, reject) => {
    try {
      const output = await Db.InvitationCode.findOne({
        where: {invitationCode: invitationCode}
      });
      if (!output) {
        return resolve({err: 'Invalid Invitation Code'});
      }
      resolve({err: null, output: output});
    }
    catch (e) {
      reject(e);
    }
  });
}

function createCode (code) {
  return new Promise(async(resolve, reject) => {
    try {
      const invitationCode = await Db.InvitationCode.create({code: code});
      if (!invitationCode) {
        return ({err: 'Invitation code was not created'});
      }
      resolve({err: null, invitationCode: invitationCode});
    }
    catch (e) {
      reject(e);
    }
  });
}

function destroyDataFromInvitationCode (invitationCode) {
  return new Promise(async(resolve, reject) => {
    try {
      const invitationCount = await Db.InvitationCode.destroy({
        where: { invitationCode: invitationCode }, individualHooks: true, returning: true
      });
      if (invitationCount === 0) {
        return resolve({err: 'Invalid invitation code'});
      }
      resolve({err: null, count: invitationCount});
    }
    catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getDataFromInvitationCode: getDataFromInvitationCode,
  destroyDataFromInvitationCode: destroyDataFromInvitationCode,
  createCode: createCode
};