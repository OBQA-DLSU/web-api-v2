module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    accessLevel: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });
  Role.associate = models => {
    Role.hasMany(models.User);
  };
  return Role;
};
