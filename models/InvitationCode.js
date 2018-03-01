const CodeGenerator = require('node-code-generator');
const generator = new CodeGenerator();
const pattern = '*********';

module.exports = (sequelize, DataTypes) => {

  const InvitationCode = sequelize.define('InvitationCode', {
    code: { type: DataTypes.STRING, allowNull: false },
    invitationCode: { type: DataTypes.STRING, allowNull: true }
  });

  InvitationCode.beforeSave(InvitationCode => {
    // Generate an array of random unique codes according to the provided pattern: 
    const codes = generator.generateCodes(pattern, 1);
    InvitationCode.invitationCode = codes[0];
  });

  return InvitationCode;
};
