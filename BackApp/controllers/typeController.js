const TypeModel = require('../models/typeModel');

class TypeController {

    async createType(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'Bad Request', message: 'No user data provided' });
            }

            const { id, ...userData } = req.body;
            console.log(userData);
    
            if (id) {
                return res.status(400).json({ error: 'Bad Request', message: 'User ID should not be provided' });
            }
    
            const newUser = await TypeModel.createType(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
    
    

    async getAllTypes(req, res) {
        try {
            const users = await TypeModel.getAllTypes();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async getTypeById(req, res) {
        const userId = req.params.iduser;
        try {
            const user = await TypeModel.getTypeById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async updateType(req, res) {
        const userId = req.params.id;
        const userData = req.body;
        try {
            const success = await TypeModel.updateType(userId, userData);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(202).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteType(req, res) {
        const userId = req.params.id;
        try {
            const success = await TypeModel.deleteType(userId);
            if (!success) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(202).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new TypeController();
