module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.STRING, allowNull: true }
  });
  Student.associate = models => {
    Student.belongsTo(models.User);
    Student.belongsTo(models.Program);
    Student.hasMany(models.MyClassStudent);
    Student.hasMany(models.Grade);
  };
  return Student;
};
