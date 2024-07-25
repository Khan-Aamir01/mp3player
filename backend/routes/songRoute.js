const express = require('express');
const router = express.Router();

const {getAllSong,getSongbyId,createSong,updateSong,deleteSong} = require('../controllers/songController');

router.get('/',getAllSong);

router.get('/:id',getSongbyId);

router.post('/',createSong);

router.put('/:id',updateSong);

router.delete('/:id',deleteSong);

module.exports = router;