'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
      timestamp: false
  })
  User.associate = function(models) {
    User.hasOne(models.Settings, {foreignKey: 'user_id'})
    User.hasOne(models.Region, {foreignKey: 'user_id'})
  }
  return User
}