module.exports = (sequelize, DataTypes) => {
  const Program = sequelize.define('Program', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true }
  });
  Program.associate = models => {
    Program.hasMany(models.Student);
    Program.hasMany(models.Instructor);
    Program.hasMany(models.ProgramCourse);
    Program.hasMany(models.ProgramSopi);
    Program.hasMany(models.MyClass);
    Program.hasMany(models.Assessment);
    Program.hasMany(models.Evidence);
  };
  return Program;
};
