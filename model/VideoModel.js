const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')
const video_Model= connection.define('video', {
  videoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  videos: {
    type: DataTypes.INTEGER
  },

},{timestamps:false,
  freezeTableName: true,
});
//relation between productmodel and video model
Product_Model.hasMany(video_Model, {
    foreignKey: 'productId',
  });
  video_Model.belongsTo(Product_Model);
module.exports=video_Model;