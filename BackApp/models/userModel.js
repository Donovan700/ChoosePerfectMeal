const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PerfectMeal',
    password: 'password',
    port: 5432,
});

class UserModel {

    async createUser(userData) {
        const { name, email } = userData;

        try {
            const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
            const values = [name, email];
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }


    async getAllUsers() {
        try {
            const { rows } = await pool.query('SELECT * FROM utilisateur');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const { rows } = await pool.query('SELECT * FROM utilisateur WHERE id = ?', [userId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, userData) {
        try {
            const { name, email } = userData;
            const { rowCount } = await pool.query('UPDATE utilisateur SET name = ?, email = ? WHERE id = ?', [name, email, userId]);
            return rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userid) {
        try {
            const {rowCount} = await pool.query('DELETE FROM utilisateur WHERE id = ?', userid);
            return rowCount > 0;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new UserModel();
