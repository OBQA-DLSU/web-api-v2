module.exports = (sequelize, DataTypes) => {
  const ProgramCourse = sequelize.define('ProgramCourse', {
    toBeAssessed: { type: DataTypes.BOOLEAN, defaultValue: false },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  ProgramCourse.associate = models => {
    ProgramCourse.belongsTo(models.Program);
    ProgramCourse.belongsTo(models.Course);
    ProgramCourse.hasMany(models.Grade);
    ProgramCourse.hasMany(models.MyClass);
    ProgramCourse.hasMany(models.Assessment);
    ProgramCourse.hasMany(models.Evidence);
  };

  return ProgramCourse;
}
