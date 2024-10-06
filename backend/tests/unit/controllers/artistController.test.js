const { getAllArtist, getArtistbyId, createArtist, updateArtist, deleteArtist } = require('../../../controllers/artistController');
const Artist = require('../../../models/artist');

// Mocking the Artist model
jest.mock('../../../models/artist');

describe('Artist Controller', () => {

    // Test for getAllArtist
    describe('getAllArtist', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return all artists with status 200', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockArtists = [{ id: 1, name: 'Artist1' }];
            Artist.findAll.mockResolvedValue(mockArtists);

            await getAllArtist(req, res);

            expect(Artist.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockArtists);
        });

        it('should handle errors and return status 400', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Artist.findAll.mockRejectedValue(new Error(errorMessage));

            await getAllArtist(req, res);

            expect(Artist.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for getArtistbyId
    describe('getArtistbyId', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return an artist by id with status 200', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockArtist = { id: 1, name: 'Artist1' };
            Artist.findByPk.mockResolvedValue(mockArtist);

            await getArtistbyId(req, res);

            expect(Artist.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockArtist);
        });

        it('should return 404 if artist is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            Artist.findByPk.mockResolvedValue(null);

            await getArtistbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Artist not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Artist.findByPk.mockRejectedValue(new Error(errorMessage));

            await getArtistbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for createArtist
    describe('createArtist', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should create a new artist and return status 201', async () => {
            const req = { body: { name: 'Artist1', imageUrl: 'image.jpg' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockArtist = { id: 1, name: 'Artist1', imageUrl: 'image.jpg' };
            Artist.create.mockResolvedValue(mockArtist);

            await createArtist(req, res);

            expect(Artist.create).toHaveBeenCalledWith({
                name: 'Artist1',
                imageUrl: 'image.jpg'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockArtist);
        });

        it('should handle errors and return status 400', async () => {
            const req = { body: { name: 'Artist1', imageUrl: 'image.jpg' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Artist.create.mockRejectedValue(new Error(errorMessage));

            await createArtist(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for updateArtist
    describe('updateArtist', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should update an artist and return status 200', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Artist', imageUrl: 'updated.jpg' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockArtist = { id: 1, name: 'Artist1', imageUrl: 'image.jpg' };
            Artist.findByPk.mockResolvedValue(mockArtist);

            await updateArtist(req, res);

            expect(Artist.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockArtist);
        });

        it('should return 404 if artist is not found', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Artist', imageUrl: 'updated.jpg' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            Artist.findByPk.mockResolvedValue(null);

            await updateArtist(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Artist not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated Artist', imageUrl: 'updated.jpg' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Artist.findByPk.mockRejectedValue(new Error(errorMessage));

            await updateArtist(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for deleteArtist
    describe('deleteArtist', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should delete an artist and return status 200', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockArtist = { id: 1, destroy: jest.fn() };
            Artist.findByPk.mockResolvedValue(mockArtist);

            await deleteArtist(req, res);

            expect(Artist.findByPk).toHaveBeenCalledWith(1);
            expect(mockArtist.destroy).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Artist deleted successfully' });
        });

        it('should return 404 if artist is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            Artist.findByPk.mockResolvedValue(null);

            await deleteArtist(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Artist not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            Artist.findByPk.mockRejectedValue(new Error(errorMessage));

            await deleteArtist(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});

