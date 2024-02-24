const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 6969;

app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log("Server launched on port: ", port);
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PerfectMeal',
    password: 'password',
    port: 5432,
});

app.get('/', (req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.send("<h1>Hello</h1>");
});

app.get('/users', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM utilisateur');
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).send('Internal server error 500');
    }
});

app.get('/types', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM type');
        res.status(200).json(rows);
    }
    catch(err) {
        console.log('Error: ', err);
        res.status(500).send('Internal server error 500');
    }
});

app.get('/foods', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM repas');
        res.status(200).json(rows);
    }
    catch (err) {
        console.log('Error: ', err);
        res.status(500).send('Internal Server Error 500');
    }
});

app.get('/plans', async (req, res) => {
    try {
        const { rows } = pool.query('SELECT * FROM plan');
        res.status(200).json(rows);
    }
    catch (err) {
        console.error('Error: ',err);
        res.status(500).send('Internal Server Error 500');
    }
});