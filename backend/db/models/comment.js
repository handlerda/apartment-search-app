"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      anonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "authorId" });
    Comment.belongsTo(models.Review, { foreignKey: "reviewId" });
  };
  return Comment;
};
