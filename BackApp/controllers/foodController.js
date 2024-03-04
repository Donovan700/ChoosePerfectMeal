const FoodModel = require('../models/foodModel.js');

class FoodController {

    async createFood(req, res) {
        const foodData = req.body;
        try {
            const foodPlan = await FoodModel.createFood(foodData);
            res.status(201).json(foodPlan);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async getAllFoods(req, res) {
        try {
            const foods = await FoodModel.getAllFoods();
            res.status(200).json(foods);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async getFoodById(req, res) {
        const foodid = req.params.id;
        try {
            const food = await FoodModel.getFoodById(foodid);
            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.status(200).json(food);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async updateFood(req, res) {
        const foodid = req.params.id;
        const foodData = req.body;
        try {
            const success = await FoodModel.updateFood(foodid, foodData);
            if (!success) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.status(202).json({ message: 'Food updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    async deleteFood(req, res) {
        const foodid = req.params.id;
        try {
            const success = await FoodModel.deleteFood(foodid);
            if (!success) {
                return res.status(404).json({ message: 'Food not found' });
            }
            res.status(202).json({ message: 'Food deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
    }
}

module.exports = new FoodController();
