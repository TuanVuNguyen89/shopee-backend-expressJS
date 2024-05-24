'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shop.init({
    name: DataTypes.STRING,
    logo: DataTypes.BLOB,
    background: DataTypes.BLOB,
    description: DataTypes.STRING,
    contact: DataTypes.STRING,
    phone: DataTypes.STRING,
    page: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};