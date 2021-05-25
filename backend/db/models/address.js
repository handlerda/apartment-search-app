"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      formattedAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  Address.associate = function (models) {
    // associations can be defined here
    Address.belongsTo(models.Apartment, { foreignKey: "apartmentId" });
  };
  return Address;
};

// npx sequelize model:generate --name InterestedApartment --attributes userId:integer,apartmentId:integer;
