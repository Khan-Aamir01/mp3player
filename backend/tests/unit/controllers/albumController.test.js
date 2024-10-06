const { getAllAlbum, getAlbumbyId, createAlbum, updateAlbum, deleteAlbum } = require('../../../controllers/albumController');
const Album = require('../../../models/album');

jest.mock('../../../models/album'); // Mock the Album model

describe('Album Controller', () => {

    // getAllAlbum
    describe('getAllAlbum', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return a list of albums with status 200', async () => {
            const mockAlbums = [{ id: 1, name: 'Album 1' }, { id: 2, name: 'Album 2' }];
            Album.findAll.mockResolvedValue(mockAlbums); // Mock Album.findAll

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllAlbum(req, res);

            expect(Album.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAlbums);
        });

        it('should handle errors and return status 400', async () => {
            const errorMessage = 'Error fetching albums';
            Album.findAll.mockRejectedValue(new Error(errorMessage));

            const req = {};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAllAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // getAlbumbyId
    describe('getAlbumbyId', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return the album with status 200', async () => {
            const mockAlbum = { id: 1, name: 'Album 1' };
            Album.findByPk.mockResolvedValue(mockAlbum);

            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAlbumbyId(req, res);

            expect(Album.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAlbum);
        });

        it('should return status 404 if album not found', async () => {
            Album.findByPk.mockResolvedValue(null);

            const req = { params: { id: 99 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAlbumbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Album not found' });
        });

        it('should handle errors and return status 400', async () => {
            const errorMessage = 'Error fetching album';
            Album.findByPk.mockRejectedValue(new Error(errorMessage));

            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await getAlbumbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // createAlbum
    describe('createAlbum', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should create a new album and return status 201', async () => {
            const mockNewAlbum = { id: 1, name: 'New Album', coverUrl: 'cover.jpg' };
            Album.create.mockResolvedValue(mockNewAlbum);

            const req = { body: { name: 'New Album', coverUrl: 'cover.jpg' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createAlbum(req, res);

            expect(Album.create).toHaveBeenCalledWith({ name: 'New Album', coverUrl: 'cover.jpg' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockNewAlbum);
        });

        it('should handle errors and return status 400', async () => {
            const errorMessage = 'Error creating album';
            Album.create.mockRejectedValue(new Error(errorMessage));

            const req = { body: { name: 'New Album', coverUrl: 'cover.jpg' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await createAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // updateAlbum
    describe('updateAlbum', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should update the album and return status 200', async () => {
            const mockAlbum = { id: 1, name: 'Updated Album', coverUrl: 'updated.jpg' };
            Album.findByPk.mockResolvedValue(mockAlbum);
            Album.update.mockResolvedValue([1]);

            const req = { params: { id: 1 }, body: { name: 'Updated Album', coverUrl: 'updated.jpg' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateAlbum(req, res);

            expect(Album.findByPk).toHaveBeenCalledWith(1);
            expect(Album.update).toHaveBeenCalledWith({ name: 'Updated Album', coverUrl: 'updated.jpg' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockAlbum);
        });

        it('should return status 404 if album not found', async () => {
            Album.findByPk.mockResolvedValue(null);

            const req = { params: { id: 99 }, body: { name: 'Updated Album' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Album not found' });
        });

        it('should handle errors and return status 400', async () => {
            const errorMessage = 'Error updating album';
            Album.findByPk.mockRejectedValue(new Error(errorMessage));

            const req = { params: { id: 1 }, body: { name: 'Updated Album' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await updateAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // deleteAlbum
    describe('deleteAlbum', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should delete the album and return status 200', async () => {
            const mockAlbum = { id: 1, destroy: jest.fn() };
            Album.findByPk.mockResolvedValue(mockAlbum);

            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await deleteAlbum(req, res);

            expect(Album.findByPk).toHaveBeenCalledWith(1);
            expect(mockAlbum.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Album deleted successfully' });
        });

        it('should return status 404 if album not found', async () => {
            Album.findByPk.mockResolvedValue(null);

            const req = { params: { id: 99 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await deleteAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Album not found' });
        });

        it('should handle errors and return status 400', async () => {
            const errorMessage = 'Error deleting album';
            Album.findByPk.mockRejectedValue(new Error(errorMessage));

            const req = { params: { id: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            await deleteAlbum(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});