const Album = require('../models/album');

const getAllAlbum = async (req, res) => {
    try {
        const album = await Album.findAll();
        res.status(200).json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getAlbumbyId = async (req, res) => {
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        res.status(200).json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createAlbum = async (req, res) => {
    const { name,coverUrl } = req.body;

    try {

        // Use Sequelize's create method
        const newAlbum = await Album.create({
            name,
            coverUrl
        });

        res.status(201).json(newAlbum);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAlbum = async (req, res) => {
    const { name,coverUrl} = req.body;
    try {
        const album = await Album.findByPk(req.params.id);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        await Album.update({
            name: name ?? album.name,
            coverUrl: coverUrl ?? album.imageUrl,
        });

        res.status(200).json(album);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteAlbum = async (req,res)=>{
    try{
        const album = await Album.findByPk(req.params.id);
        if(!album){
            res.status(404).json({message:'Album not found'});
        }
        await album.destroy();
        res.status(200).json({message:"Album deleted successfully"});
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllAlbum, getAlbumbyId, createAlbum, updateAlbum, deleteAlbum };