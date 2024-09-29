const Song = require('../models/song');
const Artist = require('../models/artist');
const Album = require('../models/album');

const getAllSong = async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.status(200).json(songs);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getSongById = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id, {
            include: {
                model: Artist,    // Include the associated artist
                as: 'Artist',     // Alias defined in the model association
                attributes: ['id', 'name']  // Select only necessary artist fields
            }
        });

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json(song);  // Return the song along with artist details
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createSong = async (req, res) => {
    const { name, artistId, albumId, genre, language, coverURL, songUrl, duration, releaseDate } = req.body;

    try {
       

        // Use Sequelize's create method
        const newSong = await Song.create({
            name,
            artistId, // Use foreign key
            albumId,  // Use foreign key
            genre,
            language,
            coverURL,
            songUrl,
            duration,
            releaseDate
        });

        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateSong = async (req, res) => {
    const { name, artistId, albumId, genre, language, coverURL, songUrl, duration, releaseDate } = req.body;
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        // Optional: Check if artist and album exist for update
        if (artistId) {
            const artistExists = await Artist.findByPk(artistId);
            if (!artistExists) {
                return res.status(404).json({ message: 'Artist not found' });
            }
        }

        if (albumId) {
            const albumExists = await Album.findByPk(albumId);
            if (!albumExists) {
                return res.status(404).json({ message: 'Album not found' });
            }
        }

        await song.update({
            name: name ?? song.name,
            artistId: artistId ?? song.artistId,
            albumId: albumId ?? song.albumId,
            genre: genre ?? song.genre,
            language: language ?? song.language,
            coverURL: coverURL ?? song.coverURL,
            songUrl: songUrl ?? song.songUrl,
            duration: duration ?? song.duration,
            releaseDate: releaseDate ?? song.releaseDate
        });

        res.status(200).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        await song.destroy();
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { getAllSong, getSongById, createSong, updateSong, deleteSong };