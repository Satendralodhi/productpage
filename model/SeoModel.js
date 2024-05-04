const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')
const SEO_Model= connection.define('SEO', {
  seoId: {
    type: DataTypes.INTEGER,
    
    primaryKey: true,
    autoIncrement:true,
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