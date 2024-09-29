const User = require('../models/user');

const getAllUser = async (req, res) => {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getUserbyId = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    const { name,gmail,password,imageUrl } = req.body;

    try {

        // Use Sequelize's create method
        const newUser = await User.create({
            name,
            gmail,
            password,//hash it later
            imageUrl
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { name,gmail,password,imageUrl} = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await User.update({
            name: name ?? user.name,
            gmail : gmial ?? user.gmail,
            password : password ?? user.password,
            imageUrl: imageUrl ?? user.imageUrl,
        });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
const deleteUser = async (req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        await user.destroy();
        res.status(200).json({message:"User deleted successfully"});
    }catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { getAllUser, getUserbyId, createUser, updateUser, deleteUser };