const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDB');

const Artist = sequelize.define('Artist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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
        console.log('Database & artist synchronized!');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });
*/
    

module.exports = Artist;