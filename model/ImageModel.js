const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')


const Image_Model= connection.define('image', {
  imageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  images: {
    type: DataTypes.INTEGER
  },

},{timestamps:false,
  freezeTableName: true,
});

//relation between productmodel and image model
Product_Model.hasMany(Image_Model, {
  foreignKey: 'productId',
});
Image_Model.belongsTo(Product_Model);

module.exports=Image_Model;