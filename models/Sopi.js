const SoHelper = require('../src/helpers/so.helper');

module.exports = (sequelize, DataTypes) => {
  const Sopi = sequelize.define('Sopi', {
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  Sopi.associate = models => {
    Sopi.belongsTo(models.So);
    Sopi.hasMany(models.ProgramSopi);
  };

  Sopi.beforeSave(async(Sopi) => {
    if (!Sopi.SoId && Sopi.SoCode) {
      const getSo = await SoHelper.getSoByCode(Sopi.SoCode);
      if (getSo.so) {
        Sopi.SoId = getSo.so.id;
      }
    }
  });

  return Sopi;
};
