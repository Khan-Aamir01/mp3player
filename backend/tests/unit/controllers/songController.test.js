const { getAllSong, getNewSong, getRecommendedSong, getSongById, createSong, updateSong, deleteSong } = require('../../../controllers/songController');
const Song = require('../../../models/song');
const Artist = require('../../../models/artist');
const Album = require('../../../models/album');
const { Sequelize } = require('sequelize');

// Mocking the models
jest.mock('../../../models/song');
jest.mock('../../../models/artist');
jest.mock('../../../models/album');

describe('Song Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();  // Reset mocks after each test
    });

    // Test for getAllSong
    describe('getAllSong', () => {
        it('should return all songs with status 200', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockSongs = [{ id: 1, name: 'Song1' }];
            Song.findAll.mockResolvedValue(mockSongs);

            await getAllSong(req, res);

            expect(Song.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSongs);
        });

        it('should handle errors and return status 400', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Song.findAll.mockRejectedValue(new Error(errorMessage));

            await getAllSong(req, res);

            expect(Song.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for getNewSong
    describe('getNewSong', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return the top 6 new songs with status 200', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockSongs = [{ id: 1, name: 'Song1', createdAt: new Date() }];
            Song.findAll.mockResolvedValue(mockSongs);

            await getNewSong(req, res);

            expect(Song.findAll).toHaveBeenCalledWith({
                order: [['createdAt', 'DESC']],
                limit: 6
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSongs);
        });

        it('should handle errors and return status 400', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Song.findAll.mockRejectedValue(new Error(errorMessage));

            await getNewSong(req, res);

            expect(Song.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for getRecommendedSong
    describe('getRecommendedSong', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return 3 random recommended songs with status 200', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockSongs = [{ id: 1, name: 'Song1' }];
            Song.findAll.mockResolvedValue(mockSongs);

            await getRecommendedSong(req, res);

            expect(Song.findAll).toHaveBeenCalledWith({
                limit: 3,
                order: Sequelize.literal('RANDOM()')
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSongs);
        });

        it('should handle errors and return status 400', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Song.findAll.mockRejectedValue(new Error(errorMessage));

            await getRecommendedSong(req, res);

            expect(Song.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for getSongById
    describe('getSongById', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return a song by id with artist details and status 200', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockSong = { id: 1, name: 'Song1', Artist: { id: 1, name: 'Artist1' } };
            Song.findByPk.mockResolvedValue(mockSong);

            await getSongById(req, res);

            expect(Song.findByPk).toHaveBeenCalledWith(1, {
                include: {
                    model: Artist,
                    as: 'Artist',
                    attributes: ['id', 'name']
                }
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockSong);
        });

        it('should return 404 if song is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            Song.findByPk.mockResolvedValue(null);

            await getSongById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Song not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Song.findByPk.mockRejectedValue(new Error(errorMessage));

            await getSongById(req, res);

            expect(Song.findByPk).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for createSong
    describe('createSong', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should create a new song and return status 201', async () => {
            const req = { body: { name: 'Song1', artistId: 1, albumId: 1, genre: 'Pop' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockSong = { id: 1, name: 'Song1', artistId: 1, albumId: 1 };
            Song.create.mockResolvedValue(mockSong);

            await createSong(req, res);

            expect(Song.create).toHaveBeenCalledWith({
                name: 'Song1',
                artistId: 1,
                albumId: 1,
                genre: 'Pop',
                language: undefined,
                coverURL: undefined,
                songUrl: undefined,
                duration: undefined,
                releaseDate: undefined
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockSong);
        });

        it('should handle errors and return status 400', async () => {
            const req = { body: { name: 'Song1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Song.create.mockRejectedValue(new Error(errorMessage));

            await createSong(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});    