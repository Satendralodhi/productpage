const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=connection.define('Product_table',{
    // id:{
    //     type:DataTypes.INTEGER,
    //     primaryKey:true,
    //     autoIncrement:true,
    // },
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,//doubt
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
          isIn: [['clothes', 'cosmetics', 'watches', 'shoes', 'accessories']],
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
          isIn: [['male', 'female', 'unisex']],
        },
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      videos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      attributes: {
        type: DataTypes.JSONB,
      },
      features: {
        type: DataTypes.JSONB,
      },
      
      availability: {
        type: DataTypes.STRING,
        defaultValue: 'in stock',
        validate: {
          isIn: [['in stock', 'out of stock', 'preorder']],
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
    
      discounts: {
        type: DataTypes.JSONB,
      },
      shipping: {
        type: DataTypes.JSONB,
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
      seo: {
        type: DataTypes.JSONB,//doubt
      },

    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
})
// const SEO = connection.define('SEO', {
//   metaTitle: {
//     type: DataTypes.STRING
//   },
//   metaDescription: {
//     type: DataTypes.STRING
//   },
//   metaKeywords: {
//     type: DataTypes.ARRAY(DataTypes.STRING)
//   }
// });
// const Discount = connection.define('Discount', {
//   type: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: {
//       isIn: [['percentage', 'fixed']]
//     }
//   },
//   value: {
//     type: DataTypes.NUMBER,
//     allowNull: false
//   }
// });

const ratings=connection.define('ratings',{
  userId: {
    type: Sequelize.UUID, // assuming userId is of type INTEGER
    references: {
      model: Product_Model,//doubt
      key: 'id'
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  },
  review: {
    type: Sequelize.STRING
  },

});

// const Shipping = connection.define('shipping', {
//   weight: {
//     type: DataTypes.FLOAT
//   },

// });
// const Dimension = connection.define('Dimension', {
//   length: {
//     type: DataTypes.INTEGER
//   },
//   width: {
//     type: DataTypes.INTEGER
//   },
//   height: {
//     type: DataTypes.INTEGER
//   }
// });

// Shipping.belongsTo(Dimension);
// Product_Model.hasMany(Discount);
// Product_Model.belongsTo(SEO);
// Product_Model.hasMany(Shipping);
Product_Model.hasMany(ratings);
module.exports=Product_Model;