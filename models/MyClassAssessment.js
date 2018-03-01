module.exports = (sequelize, DataTypes) => {
  const MyClassAssessment = sequelize.define('MyClassAssessment', {});
  MyClassAssessment.associate = models => {
    MyClassAssessment.belongsTo(models.MyClass);
    MyClassAssessment.belongsTo(models.Assessment);
  };
  return MyClassAssessment;
};
