'use strict';
module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    user_id: DataTypes.INTEGER,
    smsNotification: DataTypes.INTEGER,
    pushNotification: DataTypes.INTEGER,
    emailNotification: DataTypes.INTEGER,
    alexaNotification: DataTypes.INTEGER,
    phoneNum: DataTypes.STRING,
    alertInterval: DataTypes.INTEGER,
    location: DataTypes.STRING
  }, {
      timestamps: false
  });
  Settings.associate = function(models) {
    // associations can be defined here
  };
  return Settings;
};