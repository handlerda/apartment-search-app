"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // apartmentId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   unique: true,
      // },
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
