const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDB');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Optional, ensures the value is a valid email
        },
    },
    password: { // Hash it later
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        defaultValue: '#',
    },


});

/*
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & user synchronized!');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });
*/
    

module.exports = User;