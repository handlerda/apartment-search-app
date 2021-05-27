"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("InterestedTenants", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestedAmount: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.BOOLEAN,
      },
      other: {
        type: Sequelize.STRING,
      },
      paymentPreference: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.BOOLEAN,
      },
      text: {
        type: Sequelize.BOOLEAN,
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: { model: "Reviews" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("InterestedTenants");
  },
};
