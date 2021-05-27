"use strict";
module.exports = (sequelize, DataTypes) => {
  const InterestedTenant = sequelize.define(
    "InterestedTenant",
    {
      requestedAmount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      other: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentPreference: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      text: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  InterestedTenant.associate = function (models) {
    // associations can be defined here
    InterestedTenant.belongsTo(models.Review, { foreignKey: "reviewId" });
  };
  return InterestedTenant;
};
