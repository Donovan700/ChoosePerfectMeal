const TypeModel = require('../models/typeModel');

class TypeController {

    async createType(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ error: 'Bad Request', message: 'No types data provided' });
            }

            const { id, ...typeData } = req.body;
    
            if (id) {
                return res.status(400).json({ error: 'Bad Request', message: 'Types ID should not be provided' });
            }
    
            const newUser = await TypeModel.createType(typeData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
    
    

    async getAllTypes(req, res) {
        try {
            const users = await TypeModel.getAllTypes();
            console.log("Types listed 200");
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async getTypeById(req, res) {
        const typeId = req.params.id;
        try {
            const type = await TypeModel.getTypeById(typeId);
            if (!type) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.status(200).json(type);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async updateType(req, res) {
        const typeId = req.params.numt;
        const typeData = req.body;
        try {
            const success = await TypeModel.updateType(typeId, typeData);
            if (!success) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.status(202).json({ message: 'Type updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async deleteType(req, res) {
        const typeId = req.params.id;
        try {
            const success = await TypeModel.deleteType(typeId);
            if (!success) {
                return res.status(404).json({ message: 'Type not found' });
            }
            res.status(202).json({ message: 'Type deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
}

module.exports = new TypeController();
