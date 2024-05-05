const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../database/config");
const Product_Model = require("./Productmodel");

const Image_Model = connection.define(
  "image",
  {
    ProductTableProductId: {
      type: DataTypes.UUID,
      references: {
        model: Product_Model,
        key: "ProductId",
      },
    },
    images: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

//relation between productmodel and image model
Product_Model.hasMany(Image_Model, {
  foreignKey: "productId",
});
Image_Model.belongsTo(Product_Model);

module.exports = Image_Model;
