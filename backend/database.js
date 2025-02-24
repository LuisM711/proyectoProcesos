const {Sequelize} = require('sequelize');
//path
require('dotenv').config();
/*
dialect: 'sqlite',
    host: './db.sqlite3'
*/
// const sequelize = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASS, {
//     dialect: 'mysql'
// });
const sequelize = new Sequelize(process.env.BDD_NAME, process.env.BDD_USER, process.env.BDD_PASS, {
    dialect: 'sqlite',
    host: './db.sqlite3'
});
module.exports = sequelize;