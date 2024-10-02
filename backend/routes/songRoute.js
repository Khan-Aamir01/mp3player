const express = require('express');
const router = express.Router();

const { getAllSong, getNewSong, getRecommendedSong, getSongById, createSong, updateSong, deleteSong } = require('../controllers/songController');

router.get('/',getAllSong);

router.get('/new', getNewSong);

router.get('/recommended', getRecommendedSong)

router.get('/:id',getSongById);

router.post('/',createSong);

router.put('/:id',updateSong);

router.delete('/:id',deleteSong);

module.exports = router;