'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      smsNotification: {
        type: Sequelize.INTEGER
      },
      pushNotification: {
        type: Sequelize.INTEGER
      },
      emailNotification: {
        type: Sequelize.INTEGER
      },
      alexaNotification: {
        type: Sequelize.INTEGER
      },
      phoneNum: {
        type: Sequelize.STRING
      },
      alertInterval: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Settings')
  }
}