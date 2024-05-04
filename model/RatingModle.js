const {Sequelize,DataTypes}=require('sequelize')
const connection=require('../database/config')
const Product_Model=require('./Productmodel')
const Ratings_Model=connection.define('ratings',{
  ratingsId: {
    type: DataTypes.INTEGER,
    
    primaryKey: true,
    autoIncrement:true,
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

},{timestamps:false,
  freezeTableName: true,
});


//relation between productmodel and ratings model
Product_Model.hasMany(Ratings_Model, {
  foreignKey: 'productId',
});
Ratings_Model.belongsTo(Product_Model);


module.exports=Ratings_Model;