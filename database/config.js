const { Sequelize, DataTypes } = require("sequelize");
console.log(process.env.DATABASE);
const connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASENAME,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);
module.exports = connection;
// const dotenv = require("dotenv").config();

// console.log(process.env.PASSWORD);
// const connection = new Sequelize(
//   process.env.DATABASE,
//   process.env.DATABASENAME,
//   process.env.PASSWORD,
