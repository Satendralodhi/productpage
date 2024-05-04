const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')
const Dimension_Model = connection.define('Dimension', {
  DimensionId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  length: {
    type: DataTypes.INTEGER
  },
  width: {
    type: DataTypes.INTEGER
  },
  height: {
    type: DataTypes.INTEGER
  }
},{timestamps:false,
  freezeTableName: true,
});

//relation between productmodel and dimention model

Product_Model.belongsTo(Dimension_Model, {
  foreignKey: 'productId',
});
Dimension_Model.belongsTo(Product_Model);


module.exports=Dimension_Model;