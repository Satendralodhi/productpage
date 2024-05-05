const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')
const SEO_Model= connection.define('SEO', {
  ProductTableProductId: {
    type: DataTypes.UUID,
    references:{
model:Product_Model,
key:'ProductId'
    },
    primaryKey: true,
    allowNull: false,
  },
  metaTitle: {
    type: DataTypes.STRING
  },
  metaDescription: {
    type: DataTypes.STRING
  },
  metaKeywords: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  }
},{timestamps:false,
  freezeTableName: true,
});


Product_Model.belongsTo(SEO_Model, {
  foreignKey: 'productId',
});
SEO_Model.belongsTo(Product_Model);
module.exports=SEO_Model;