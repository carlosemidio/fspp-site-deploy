module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    title:    DataTypes.STRING,
    content:  { type: DataTypes.TEXT, allowNull: true },
    image:    { type: DataTypes.STRING, allowNull: true }
  }, {
    charset: 'utf8mb4',
    });

  return News;
};