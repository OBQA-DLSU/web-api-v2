module.exports = (sequelize, DataTypes) => {
  const Assessment = sequelize.define('Assessment', {
    AssessmentLevel: { type: DataTypes.INTEGER, allowNull: true},
    AssessmentTask: { type: DataTypes.STRING, allowNull: true },
    target: { type: DataTypes.DOUBLE, allowNull: true },
    passingGrade: { type: DataTypes.DOUBLE, allowNull: true },
    performance: { type: DataTypes.DOUBLE, allowNull: true },
    improvementPlan: { type: DataTypes.STRING, allowNull: true },
    term: { type: DataTypes.INTEGER, allowNull: false },
    academicYear: { type: DataTypes.STRING, allowNull: false, validate: { len: [9] } },
    cycle: { type: DataTypes.INTEGER, allowNull: false }
  });

  Assessment.associate = models => {
    Assessment.belongsTo(models.Program);
    Assessment.belongsTo(models.ProgramSopi);
    Assessment.belongsTo(models.ProgramCourse);
    Assessment.hasMany(models.MyClassAssessment);
    Assessment.hasMany(models.Grade);
    Assessment.hasMany(models.Evidence);
    Assessment.hasMany(models.AssessmentDiscussion);
  };

  return Assessment;
};
