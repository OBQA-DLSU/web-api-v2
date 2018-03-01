module.exports = (sequelize, DataTypes) => {
  const ProgramSopi = sequelize.define('ProgramSopi', {
    description: { type: DataTypes.STRING, allowNull: true }
  });

  ProgramSopi.associate = models => {
    ProgramSopi.belongsTo(models.Program);
    ProgramSopi.belongsTo(models.Sopi);
    ProgramSopi.hasMany(models.Grade);
    ProgramSopi.hasMany(models.Assessment);
    ProgramSopi.hasMany(models.Evidence);
  };

  return ProgramSopi;
};