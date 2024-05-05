const { Sequelize, DataTypes } = require("sequelize");
const connection = new Sequelize("postgres", "postgres", "admin@123", {
  host: "localhost",
  dialect: "postgres",
});
module.exports = connection;
