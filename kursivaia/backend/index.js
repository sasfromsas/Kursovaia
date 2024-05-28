const cors = require('cors');
const mysql = require('mysql');
const express = require('express')

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'MySQL-8.0',
    user: 'root',
    password: '',
    database: 'praktika'
});

connection.connect((error) => {
    if (error) {
        console.error('Ошибка подключения:', error);
    } else {
        console.log('Подключено к базе данных MySQL');
    }
});


app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});





app.post('/orders', (req, res) => {
    const { order_details } = req.body;
    connection.query('INSERT INTO orders (order_details) VALUES (?)', [JSON.stringify(order_details)], (error, result) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(201).json({ message: 'Order added successfully', result });
    });
});




app.get('/orders', (req, res) => {
    connection.query('SELECT * FROM orders', (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
        } else {
            res.json({
                status: 200,
                body: results
            });
        }
    });
});