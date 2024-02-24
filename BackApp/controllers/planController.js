const PlanModel = require('../models/planModel');

class PlanController {

    async createPlan(req, res) {
        const planData = req.body;
        try {
            const newPlan = await PlanModel.createPlan(planData);
            res.status(201).json(newPlan);
        }
        catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async getAllPlans(req, res) {
        try {
            const plans = await PlanModel.getAllplans();
            res.status(200).json(plans);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async getPlanById(req, res) {
        const idplan = req.params.id;
        try {
            const plan = await PlanModel.getPlanById(idplan);
            if (!plan) {
                return res.status(404).json({ message: 'Plan not found' });
            }
            res.status(200).json(plan);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async updatePlan(req, res) {
        const idplan = req.params.id;
        const planData = req.body;
        try {
            const success = await PlanModel.updatePlan(idplan, planData);
            if (!success) {
                return res.status(404).json({ message: 'Plan not found' });
            }
            res.status(202).json({ message: 'Plan updated successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }

    async deletePlan(req, res) {
        const idplan = req.params.id;
        try {
            const success = await PlanModel.deletePlan(idplan);
            if (!success) {
                return res.status(404).json({ message: 'Plan not found' });
            }
            res.status(202).json({ message: 'Plan deleted successfully' });
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new PlanController();
