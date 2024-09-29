const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDB');

const Album = sequelize.define('Album', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    coverUrl: {
        type: DataTypes.STRING,
        defaultValue: '#',
    },
});
/*
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & album synchronized!');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });
*/
    

module.exports = Album;