'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
    user_id: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    timestamps: false
  });
  Region.associate = function(models) {
    // associations can be defined here
  };
  return Region;
};