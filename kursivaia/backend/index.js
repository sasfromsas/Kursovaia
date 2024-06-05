const cors = require('cors');
const mysql = require('mysql');
const express = require('express')
const jwt = require('jsonwebtoken');

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



app.post('/saveResult', (req, res) => {
    const { test_id, user_id, result } = req.body;
    const query = 'INSERT INTO tests_results (test_id, user_id, result) VALUES (?, ?, ?)';
    connection.query(query, [test_id, user_id, JSON.stringify(result)], (error, results) => {
        if (error) {
            return res.status(500).send('Ошибка при добавлении результатов теста');
        }
        res.status(200).send('Результаты теста успешно добавлены');
    });
});


app.post('/users/registration', (req, res) => {
    const { user_name, user_email, user_password, token } = req.body;
    
    // Check if the email already exists in the database
    connection.query('SELECT * FROM users WHERE user_email = ?', [user_email], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: 'User with the same email already exists' });
        }

        // Insert the user into the database if no duplicate found
        connection.query('INSERT INTO Users (user_name, user_email, user_password, token) VALUES (?, ?, ?, ?)', [user_name, user_email, user_password, token], (error, result) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ message: 'User added successfully', userId: result.insertId });
        });
    });
});



app.post('/user/login', (req, res) => {
    const { user_email, user_password } = req.body;

    // Check if the email and password match a user in the database
    connection.query('SELECT * FROM users WHERE user_email = ? AND user_password = ?', [user_email, user_password], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const user = results[0];

            // Generate a JWT token for successful authentication
            const token = jwt.sign({ id: user.user_id, email: user.user_email}, 'your_secret_key', { expiresIn: '1h' });

            connection.query('UPDATE users SET token = ? WHERE user_id = ?', [token, user.user_id], (updateError, updateResult) => {
                if (updateError) {
                    return res.status(500).json({ error: updateError.message });
                }
                // Send the response only after the token has been updated in the database
                res.status(200).json({ message: 'Successful authentication', token, user });
            });
        }
    });
});



app.post('/user/logout', (req, res) => {
    // Retrieve the token value from the cookie
    const token = req.body.token;
    
    if (!token){
        return res.status(403).json({ error: 'неавторизованный пользователь' });
    }
    
    connection.query('SELECT * FROM users WHERE token = ?', [token], (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const user = results[0];
        
        if (!user.user_id) {
            return res.status(400).json({ error: 'Идентификатор пользователя отсутствует' });
        }

        connection.query('UPDATE users SET token = ? WHERE user_id = ?', [null, user.user_id], (updateError, updateResult) => {
            if (updateError) {
                return res.status(500).json({ error: updateError.message });
            }
            
            return res.status(200).json({ message: 'Logout successful'});
        });
    });
});