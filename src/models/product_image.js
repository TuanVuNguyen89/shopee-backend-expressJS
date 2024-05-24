'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_image.belongsTo(models.Product);
    }
  }
  Product_image.init({
    image: DataTypes.BLOB,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_image',
  });
  return Product_image;
};