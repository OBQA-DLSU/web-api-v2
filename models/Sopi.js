module.exports = (sequelize, DataTypes) => {
  const Sopi = sequelize.define('Sopi', {
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  Sopi.associate = models => {
    Sopi.belongsTo(models.So);
    Sopi.hasMany(models.ProgramSopi);
  };

  return Sopi;
};
