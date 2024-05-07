const { Sequelize, DataTypes } = require("sequelize");
const connection = require("../database/config");
const Product_Model = connection.define(
  "Product_table",
  {
    productId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4, //doubt
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["clothes", "cosmetics", "watches", "shoes", "accessories"]],
      },
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female", "unisex"]],
      },
    },

    attributes: {
      type: DataTypes.JSONB,
    },
    features: {
      type: DataTypes.JSONB,
    },

    availability: {
      type: DataTypes.STRING,
      defaultValue: "in stock",
      validate: {
        isIn: [["in stock", "out of stock", "preorder"]],
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    inventoryManagement: {
      type: DataTypes.JSONB,
      defaultValue: {
        lowStockAlert: false,
        restocking: false,
      },
    },
    relatedProducts: {
      type: DataTypes.ARRAY(DataTypes.UUID),
    },
    customizationOptions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  { timestamps: false, freezeTableName: true }
);
module.exports = Product_Model;
