module.exports = (sequelize, DataTypes) => {
  const Evidence = sequelize.define('Evidence', {
    name: { type: DataTypes.STRING, allowNull: true },
    publicId: { type: DataTypes.STRING, allowNull: false },
    eTag: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    securedUrl: { type: DataTypes.STRING },
    mimeType: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING, enum:['MIN', 'MAX', 'MED'] }
  });

  Evidence.associate = models => {
    Evidence.belongsTo(models.Program);
    Evidence.belongsTo(models.Assessment);
    Evidence.belongsTo(models.MyClass);
    Evidence.belongsTo(models.ProgramCourse);
    Evidence.belongsTo(models.ProgramSopi);
  };

  return Evidence;
};
