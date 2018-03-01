module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define('Grade', {
    grade: { type: DataTypes.DOUBLE, allowNull: false, validate: { max: 1 } },
    term: { type: DataTypes.INTEGER, allowNull: false },
    cycle: { type: DataTypes.INTEGER, allowNull: false },
    academicYear: { type: DataTypes.STRING, allowNull: false, validate: { len: [9] } }
  });

  Grade.associate = models => {
    Grade.belongsTo(models.Student);
    Grade.belongsTo(models.Instructor);
    Grade.belongsTo(models.ProgramCourse);
    Grade.belongsTo(models.ProgramSopi);
    Grade.belongsTo(models.Assessment);
    Grade.belongsTo(models.MyClass);
  }

  return Grade;
};