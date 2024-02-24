const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const foodController = require('../controllers/foodController');
const planController = require('../controllers/planController');
const typeController = require('../controllers/typeController');

//User
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.post('/users/add', userController.createUser);
router.put('/users/add/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

//Food
router.get('/foods', foodController.getAllFoods);
router.get('/foods/:id', foodController.getFoodById);
router.post('/foods/add', foodController.createFood);
router.put('/foods/add/:id', foodController.updateFood);
router.delete('/foods/:id', foodController.deleteFood);

//Plans
router.get('/plans', planController.getAllPlans);
router.get('/plans/:id', planController.getPlanById);
router.post('/plans/add', planController.createPlan);
router.put('/plans/add/:id', planController.updatePlan);
router.delete('/plans/:id', planController.deletePlan);

//Types
router.get('/types', typeController.getAllTypes);
router.get('/types/:id', typeController.getTypeById);
router.post('/types/add', typeController.createType);
router.put('/types/add/:id', typeController.updateType);
router.delete('/types/:id', typeController.deleteType);

module.exports = router;
