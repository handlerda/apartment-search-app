"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.User, { foreignKey: "authorId" });
    Review.belongsTo(models.Apartment, { foreignKey: "apartmentId" });
    Review.hasMany(models.Comment, { foreignKey: "reviewId" });
  };
  return Review;
};
