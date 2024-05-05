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
// const SEO = connection.define('SEO', {
//   seoId: {
//     type: DataTypes.INTEGER,

//     primaryKey: true,
//     autoIncrement:true,
//   },
//   metaTitle: {
//     type: DataTypes.STRING
//   },
//   metaDescription: {
//     type: DataTypes.STRING
//   },
//   metaKeywords: {
//     type: DataTypes.ARRAY(DataTypes.STRING)
//   }
// },{timestamps:false,
//   freezeTableName: true,
// });
// const Discount = connection.define('Discount', {
//   DiscountId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     allowNull: false,
//   },
//   productId: {
//     type: DataTypes.UUID,
//     defaultValue: Sequelize.UUIDV4,//doubt

//     allowNull: false,
//   },
// type:{
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['percentage', 'fixed']]
//     }
//   },
//   value:{
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
// },{timestamps:false,
//   freezeTableName: true,
// });

// const ratings=connection.define('ratings',{
//   ratingsId: {
//     type: DataTypes.INTEGER,

//     primaryKey: true,
//     autoIncrement:true,
//   },

//   rating: {
//     type: Sequelize.INTEGER,
//     validate: {
//       min: 1,
//       max: 5
//     }
//   },
//   review: {
//     type: Sequelize.STRING
//   },

// },{timestamps:false,
//   freezeTableName: true,
// });

// const Shipping = connection.define('shipping', {
//   ShippingId:  {
//     type: DataTypes.INTEGER,

//     primaryKey: true,
//     autoIncrement:true,
//   },

//   weight: {
//     type: DataTypes.FLOAT
//   },
//   restriction: {
//     type: Sequelize.STRING
//   },

// },{timestamps:false,
//   freezeTableName: true,
// });
// const Dimension = connection.define('Dimension', {
//   DimensionId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement:true,
//   },
//   length: {
//     type: DataTypes.INTEGER
//   },
//   width: {
//     type: DataTypes.INTEGER
//   },
//   height: {
//     type: DataTypes.INTEGER
//   }
// },{timestamps:false,
//   freezeTableName: true,
// });

// const image= connection.define('image', {
//   imageId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement:true,
//   },
//   images: {
//     type: DataTypes.INTEGER
//   },

// },{timestamps:false,
//   freezeTableName: true,
// });
// const video= connection.define('video', {
//   videoId: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement:true,
//   },
//   videos: {
//     type: DataTypes.INTEGER
//   },

// },{timestamps:false,
//   freezeTableName: true,
// });

// //relation between productmodel and image model
// Product_Model.hasMany(image, {
//   foreignKey: 'productId',
// });
// image.belongsTo(Product_Model);
// //relation between productmodel and ratings model
// Product_Model.hasMany(ratings, {
//   foreignKey: 'productId',
// });
// ratings.belongsTo(Product_Model);
// // relation between productmodel and discount model
// Product_Model.hasMany(Discount, {
//   foreignKey: 'productId',
// });
// Discount.belongsTo(Product_Model);
// //relation between productmodel and shiping model
// Product_Model.belongsTo(Shipping, {
//   foreignKey: 'productId',
// });
// Shipping.belongsTo(Product_Model);
// Product_Model.belongsTo(Dimension, {
//   foreignKey: 'productId',
// });
// Dimension.belongsTo(Product_Model);

// Product_Model.belongsTo(SEO, {
//   foreignKey: 'productId',
// });
// SEO.belongsTo(Product_Model);
// module.exports=Product_Model;
