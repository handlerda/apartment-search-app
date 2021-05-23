"use strict";
module.exports = (sequelize, DataTypes) => {
  const Apartment = sequelize.define(
    "Apartment",
    {
      addressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      googlePlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {}
  );
  Apartment.associate = function (models) {
    // associations can be defined here
    Apartment.hasOne(models.Address, { foreignKey: "addressId" });
    Apartment.belongsToMany(models.User, {
      through: "interestedApartments",
      otherKey: "userId",
      foreignKey: "apartmentId",
    });
  };
  return Apartment;
};
