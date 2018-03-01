module.exports = (sequelize, DataTypes) => {
  const MyClassStudent = sequelize.define('MyClassStudent', {
    status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'ACTIVE' }
  });

  MyClassStudent.associate = models => {
    MyClassStudent.belongsTo(models.MyClass);
    MyClassStudent.belongsTo(models.Student);
  };

  return MyClassStudent;
};
