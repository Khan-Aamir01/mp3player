const Song = require('../models/song');

const getAllSong = async (req, res) => {
    try {
        const song = await Song.findAll();
        res.status(200).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getSongbyId = async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createSong = async (req, res) => {
    const { name, artist, album, genre, language, coverURL, songUrl, duration, releaseDate } = req.body;

    try {

        // Use Sequelize's create method
        const newSong = await Song.create({
            name,
            artist,
            album,
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
    const { name, artist, album, genre, language, coverURL, songUrl, duration, releaseDate } = req.body;
    try {
        const song = await Song.findByPk(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        await song.update({
            name: name ?? song.name,
            artist: artist ?? song.artist,
            album: album ?? song.album,
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
const deleteSong = async (req,res)=>{
    try{
        const song = await Song.findByPk(req.params.id);
        if(!song){
            res.status(404).json({message:'Song not found'});
        }
        await song.destroy();
        res.status(200).json({message:"Song deleted successfully"});
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllSong, getSongbyId, createSong, updateSong, deleteSong };