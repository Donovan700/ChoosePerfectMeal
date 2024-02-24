const { Pool } = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PerfectMeal',
    password: 'password',
    port: 5432,
});

class TypeModel {


    async createType(typeData) {
        try {
            const { numt, designt } = typeData;
    
            const query = 'INSERT INTO type VALUES ($1, $2) RETURNING *';
            const values = [numt, designt];
    
            const { rows } = await pool.query(query, values);
            return rows[0];
        } catch (error) {
            console.error('Error creating type:', error);
            throw error;
        }
    }
    
    


    async getAllTypes() {
        try {
            const { rows } = await pool.query('SELECT * FROM type');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getTypeById(numt) {
        try {
            const { rows } = await pool.query('SELECT * FROM type WHERE numt = $1', [numt]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    async updateType(numt, typeData) {
        try {
            const { designt } = typeData;
            const { rowCount } = await pool.query('UPDATE type SET designt = ? WHERE numt = ?', [designt, numt]);
            return rowCount > 0;
        } catch (error) {
            throw error;
        }
    }

    async deleteType(numt) {
        try {
            const {rowCount} = await pool.query('DELETE FROM type WHERE id = ?', numt);
            return rowCount > 0;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = new TypeModel();
