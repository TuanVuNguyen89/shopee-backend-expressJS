'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Product_image);
      Product.belongsTo(models.Category);
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};