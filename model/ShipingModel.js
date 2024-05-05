const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../database/config");
const Product_Model = require("./Productmodel");

const Shipping_Model = connection.define(
  "shipping",
  {
    ProductTableProductId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Product_Model,
        key: "ProductId",
      },
    },

    weight: {
      type: DataTypes.FLOAT,
    },
    restriction: {
      type: Sequelize.STRING,
    },
  },
  { timestamps: false, freezeTableName: true }
);

//relation between productmodel and shiping model
Product_Model.belongsTo(Shipping_Model, {
  foreignKey: "productId",
});
Shipping_Model.belongsTo(Product_Model);

module.exports = Shipping_Model;
