module.exports = {
  invitationMail: (invitationCode, deeplink = '#') => {
    return `
      <p>Greetings!</p>
      <p>You are invited to be a part of GCOE OBQA-System.</p>
      <p>Please click the link to join</p>
      <p>Signup with CODE: <a href="${deeplink}/${invitationCode}">${invitationCode}</a></p>
      </br>
      <p>Sincerely,</p>
      <p>GCOE TEAM</p>
    `;
  }
};