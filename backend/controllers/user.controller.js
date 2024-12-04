const User = require('../model/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, phoneNumber } = req.body;
        const user = await User.create({ name, email, phoneNumber });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
