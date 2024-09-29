const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database: 'MP3_Player',
});


module.exports = sequelize;  
