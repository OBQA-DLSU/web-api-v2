module.exports = (sequelize, DataTypes) => {
  const AssessmentDiscussion = sequelize.define('AssessmentDiscussion', {
    discussion: { type: DataTypes.STRING, allowNull: true }
  });

  AssessmentDiscussion.associate = models => {
    AssessmentDiscussion.belongsTo(models.Assessment);
    AssessmentDiscussion.belongsTo(models.Instructor);
  };

  return AssessmentDiscussion;
};
