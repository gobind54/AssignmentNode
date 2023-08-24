const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const authenticationService = require('../services/authenticationService');

exports.createUser = async(req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.updateUser = async(req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;

    try {
        await User.findByIdAndUpdate(id, { username, password });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async(req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

exports.forgotPassword = async(req, res) => {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    try {
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });

        // You can send the temporary password via email or SMS
        // Here, we are just sending the temporary password as a response
        res.status(200).json({ message: 'Temporary password generated', tempPassword });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password' });
    }
};