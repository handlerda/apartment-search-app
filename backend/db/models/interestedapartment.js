"use strict";
module.exports = (sequelize, DataTypes) => {
  const InterestedApartment = sequelize.define(
    "InterestedApartment",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      apartmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Apartments",
          key: "id",
        },
      },
    },
    {}
  );
  InterestedApartment.associate = function (models) {
    // associations can be defined here
  };
  return InterestedApartment;
};
