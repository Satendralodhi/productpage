const { DataTypes } = require("sequelize");
const connection = require("../database/config");
const Product_Model = require("./Productmodel");
const userWishlistModel = connection.define(
  "userWishlist",
  {
    ProductTableProductId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: Product_Model,
        key: "ProductId",
      },
    },

    wishlist: {
      type: DataTypes.ARRAY(DataTypes.UUID),
    },
  },
  { timestamps: false, freezeTableName: true }
);

//relation between productmodel and dimention model

Product_Model.belongsTo(userWishlistModel, {
  foreignKey: "productId",
});
userWishlistModel.belongsTo(Product_Model);

module.exports = userWishlistModel;
