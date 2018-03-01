module.exports = (sequelize, DataTypes) => {
  const So = sequelize.define('So', {
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  So.associate = models => {
    So.hasMany(models.Sopi);
  };

  return So;
};
