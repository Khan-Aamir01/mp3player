const Artist = require('../models/artist');

const getAllArtist = async (req, res) => {
    try {
        const artist = await Artist.findAll();
        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getArtistbyId = async (req, res) => {
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createArtist = async (req, res) => {
    const { name,imageUrl } = req.body;

    try {

        // Use Sequelize's create method
        const newArtist = await Artist.create({
            name,
            imageUrl
        });

        res.status(201).json(newArtist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateArtist = async (req, res) => {
    const { name,imageUrl} = req.body;
    try {
        const artist = await Artist.findByPk(req.params.id);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }
        await Artist.update({
            name: name ?? artist.name,
            imageUrl: imageUrl ?? artist.imageUrl,
        });

        res.status(200).json(artist);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteArtist = async (req,res)=>{
    try{
        const artist = await Artist.findByPk(req.params.id);
        if(!artist){
            res.status(404).json({message:'Artist not found'});
        }
        await artist.destroy();
        res.status(200).json({message:"Artist deleted successfully"});
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllArtist, getArtistbyId, createArtist, updateArtist, deleteArtist };