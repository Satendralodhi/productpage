const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../database/config");
const Product_Model = require("./Productmodel");
const Discount_Model = connection.define(
  "Discount",
  {
    ProductTableProductId: {
      type: DataTypes.UUID,
      references: {
        model: Product_Model,
        key: "ProductId",
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["percentage", "fixed"]],
      },
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true }
);

// relation between productmodel and discount model
Product_Model.hasMany(Discount_Model, {
  foreignKey: "productId",
});
Discount_Model.belongsTo(Product_Model);

module.exports = Discount_Model;
