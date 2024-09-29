const express = require('express');
const router = express.Router();

const { getAllArtist, getArtistbyId, createArtist, updateArtist, deleteArtist } = require('../controllers/artistController');

router.get('/',getAllArtist);

router.get('/:id',getArtistbyId);

router.post('/',createArtist);

router.put('/:id',updateArtist);

router.delete('/:id',deleteArtist);

module.exports = router;