const UserModel = require('../models/userModel');

class UserController {

    async createUser(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'Bad Request', message: 'No user data provided' });
            }

            const { id, ...userData } = req.body;
    
            if (id) {
                return res.status(400).json({ error: 'Bad Request', message: 'User ID should not be provided' });
            }
    
            const newUser = await UserModel.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
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
            res.status(500).json({ error: 'Internal Server Error', message: error.message});
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
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
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
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
}

module.exports = new UserController();
