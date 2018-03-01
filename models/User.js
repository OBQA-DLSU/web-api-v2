const bcrypt = require('bcrypt-nodejs');
module.exports = (sequelize, DataTypes) => {
  let programId;
  const User = sequelize.define('User', {
    idNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    fname: { type: DataTypes.STRING, allowNull: true },
    lname: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, defaultValue: 'ACTIVE'},
    password: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Instructor);
    User.hasMany(models.Student);
    User.belongsTo(models.Role);
  };
  User.beforeSave(User => {
    if (User.email && User.password) {
      const salt = bcrypt.genSaltSync(10);
      User.password = bcrypt.hashSync(User.password, salt);
    }
  });
  return User;
};
