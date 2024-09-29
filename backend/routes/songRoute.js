const express = require('express');
const router = express.Router();

const { getAllSong, getSongById, createSong, updateSong, deleteSong } = require('../controllers/songController');

router.get('/',getAllSong);

router.get('/:id',getSongById);

router.post('/',createSong);

router.put('/:id',updateSong);

router.delete('/:id',deleteSong);

module.exports = router;