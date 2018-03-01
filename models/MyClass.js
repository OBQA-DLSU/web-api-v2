module.exports = (sequelize, DataTypes) => {
  const MyClass = sequelize.define('MyClass', {
    term: { type: DataTypes.INTEGER, allowNull: false },
    academicYear: { type: DataTypes.STRING, allowNull: false, validate: { len: [9] } },
    cycle: { type: DataTypes.INTEGER, allowNull: false }
  });

  MyClass.associate = models => {
    MyClass.belongsTo(models.Program);
    MyClass.belongsTo(models.ProgramCourse);
    MyClass.belongsTo(models.Instructor);
    MyClass.hasMany(models.MyClassStudent);
    MyClass.hasMany(models.MyClassAssessment);
    MyClass.hasMany(models.Grade);
    MyClass.hasMany(models.Evidence);
  };

  return MyClass;
};
