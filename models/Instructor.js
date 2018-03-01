module.exports = (sequelize, DataTypes) => {
  const Instructor = sequelize.define('Instructor', {
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'ACTIVE' }
  });

  Instructor.associate = models => {
    Instructor.belongsTo(models.User);
    Instructor.belongsTo(models.Program);
    Instructor.hasMany(models.Grade);
    Instructor.hasMany(models.MyClass);
    Instructor.hasMany(models.AssessmentDiscussion);
  };
  
  return Instructor;
};
