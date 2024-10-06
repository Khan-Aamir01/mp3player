const { getAllUser, getUserbyId, createUser, updateUser, deleteUser } = require('../../../controllers/userController');
const User = require('../../../models/user');

// Mocking the models
jest.mock('../../../models/user');

describe('User Controller', () => {

    // Test for getAllUser
    describe('getAllUser', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return all users with status 200', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockUsers = [{ id: 1, name: 'User1' }];
            User.findAll.mockResolvedValue(mockUsers);

            await getAllUser(req, res);

            expect(User.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUsers);
        });

        it('should handle errors and return status 400', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            User.findAll.mockRejectedValue(new Error(errorMessage));

            await getAllUser(req, res);

            expect(User.findAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for getUserbyId
    describe('getUserbyId', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should return a user by id with status 200', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockUser = { id: 1, name: 'User1' };
            User.findByPk.mockResolvedValue(mockUser);

            await getUserbyId(req, res);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            User.findByPk.mockResolvedValue(null);

            await getUserbyId(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            User.findByPk.mockRejectedValue(new Error(errorMessage));

            await getUserbyId(req, res);

            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for createUser
    describe('createUser', () => {
        it('should create a new user and return status 201', async () => {
            const req = { body: { name: 'User1', gmail: 'user1@gmail.com', password: 'password123', imageUrl: 'http://imageurl.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockUser = { id: 1, name: 'User1', gmail: 'user1@gmail.com' };
            User.create.mockResolvedValue(mockUser);

            await createUser(req, res);

            expect(User.create).toHaveBeenCalledWith({
                name: 'User1',
                gmail: 'user1@gmail.com',
                password: 'password123',  // should be hashed later
                imageUrl: 'http://imageurl.com'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should handle errors and return status 400', async () => {
            const req = { body: { name: 'User1' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            User.create.mockRejectedValue(new Error(errorMessage));

            await createUser(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for updateUser
    describe('updateUser', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should update a user and return status 200', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated User', gmail: 'updated@gmail.com', password: 'newpassword', imageUrl: 'http://newimageurl.com' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockUser = { id: 1, name: 'User1', update: jest.fn() };
            User.findByPk.mockResolvedValue(mockUser);

            await updateUser(req, res);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(mockUser.update).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockUser);
        });

        it('should return 404 if user is not found', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated User' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            User.findByPk.mockResolvedValue(null);

            await updateUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 }, body: { name: 'Updated User' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            User.findByPk.mockRejectedValue(new Error(errorMessage));

            await updateUser(req, res);

            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

    // Test for deleteUser
    describe('deleteUser', () => {
        afterEach(() => {
            jest.clearAllMocks();  // Reset mocks after each test
        });
        it('should delete a user and return status 200', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const mockUser = { id: 1, destroy: jest.fn() };
            User.findByPk.mockResolvedValue(mockUser);

            await deleteUser(req, res);

            expect(User.findByPk).toHaveBeenCalledWith(1);
            expect(mockUser.destroy).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
        });

        it('should return 404 if user is not found', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            User.findByPk.mockResolvedValue(null);

            await deleteUser(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
        });

        it('should handle errors and return status 400', async () => {
            const req = { params: { id: 1 } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const errorMessage = 'Error';
            User.findByPk.mockRejectedValue(new Error(errorMessage));

            await deleteUser(req, res);

            expect(User.findByPk).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });

});
