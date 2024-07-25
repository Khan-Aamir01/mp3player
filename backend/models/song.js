const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDB');

const Song = sequelize.define('Song', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    album: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coverURL: {
        type: DataTypes.STRING,
        defaultValue: '#',
    },
    songUrl : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    duration: {
        type: DataTypes.INTEGER,
    },
    playCounter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    releaseDate: {
        type: DataTypes.DATE,
    },
});
/*
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables synchronized!');
    })
    .catch(error => {
        console.error('This error occurred:', error);
    });

    */

module.exports = Song;