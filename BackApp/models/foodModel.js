const { pool } = require('../connexion/connexion.js');
class FoodModel {

    async createFood(foodData) {
        const { numr, designr, descrr, difficulr, tempsr } = foodData;

        try {
            const query = 'INSERT INTO repas (numr, designr, descrr, difficulr, tempsr) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            const values = [numr, designr, descrr, difficulr, tempsr];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async getAllFoods() {
        try {
            const { rows } = await pool.query('SELECT * FROM repas');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getFoodById(foodid) {
        try {
            const { rows } = await pool.query('SELECT * FROM repas WHERE numr = $1', [foodid]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateFood(foodid, foodData) {
        try {
            const { design, descr, difficul, time } = foodData;
            const { rowCount } = await pool.query('UPDATE repas SET designr = $1, descrr = $2, difficulr = $3, tempsr = $4 WHERE numr = $5', [design, descr, difficul, time, foodid]);
            return rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteFood(foodid) {
        try {
            const {rowCount} = await pool.query('DELETE FROM repas WHERE numr = $1', foodid);
            return rowCount > 0;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new FoodModel();
