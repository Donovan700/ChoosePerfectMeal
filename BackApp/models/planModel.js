const { pool } = require('../connexion/connexion');

class PlanModel {

    async createPlan(planData) {
        const { idplan, dateplan } = planData;

        try {
            const query = 'INSERT INTO plan (dateplan) VALUES ($1) RETURNING *';
            const values = [dateplan];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAllplans() {
        try {
            const { rows } = await pool.query('SELECT * FROM plan');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getPlanById(idplan) {
        try {
            const { rows } = await pool.query('SELECT * FROM plan WHERE idplan = $1', [idplan]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updatePlan(idplan, planData) {
        try {
            const { dateplan } = planData;
            const { rowCount } = await pool.query('UPDATE plan SET dateplan = $1 WHERE id = $2', [dateplan, idplan]);
            return rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(idplan) {
        try {
            const {rowCount} = await pool.query('DELETE FROM plan WHERE idplan = $1', idplan);
            return rowCount > 0;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new PlanModel();
