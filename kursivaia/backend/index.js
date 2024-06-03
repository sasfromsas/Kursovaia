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
    database: 'peripheral_trainer'
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



