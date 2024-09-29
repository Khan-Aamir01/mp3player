const { DataTypes } = require('sequelize');
const sequelize = require('../config/configDB');
const Artist = require('./artist'); // Make sure to import the Artist model
const Album = require('./album'); // Make sure to import the Album model

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
    songUrl: {
        type: DataTypes.STRING,
        allowNull: false,
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
    // Foreign key to associate with Artist
    artistId: {
        type: DataTypes.INTEGER,
        references: {
            model: Artist, // References the Artist model
            key: 'id',
        },
        allowNull: true,
    },
    // Foreign key to associate with Album
    albumId: {
        type: DataTypes.INTEGER,
        references: {
            model: Album, // References the Album model
            key: 'id',
        },
        allowNull: true,
    },
});

// Set up associations
Artist.hasMany(Song, { foreignKey: 'artistId' });
Song.belongsTo(Artist, { foreignKey: 'artistId' });

Album.hasMany(Song, { foreignKey: 'albumId' });
Song.belongsTo(Album, { foreignKey: 'albumId' });

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