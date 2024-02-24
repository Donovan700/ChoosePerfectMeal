const UserModel = require('../models/userModel');

class UserController {

    async createUser(req, res) {
        const userData = req.body;
        try {
            const newUser = await UserModel.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserModel.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await UserModel.getUserById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        try {
            const success = await UserModel.updateUser(userId, userData);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(202).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const success = await UserModel.deleteUser(userId);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(202).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new UserController();
