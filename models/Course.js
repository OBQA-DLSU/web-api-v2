module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: { type: DataTypes.STRING, allowNull: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true }
  });

  Course.associate = models => {
    Course.hasMany(models.ProgramCourse);
  };

  return Course;
};
