'use strict'
module.exports = (sequelize, DataTypes) => {
  const Weather = sequelize.define('Weather', {
    desc: DataTypes.STRING,
    main: DataTypes.STRING,
    temp: DataTypes.INTEGER,
    humidity: DataTypes.INTEGER,
    feels_like: DataTypes.INTEGER
  }, {
    timestamp: false
  })
  Weather.associate = function(models) {
    // associations can be defined here
  }
  return Weather
}