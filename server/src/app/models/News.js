module.exports = (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING
  });

  return News;
};