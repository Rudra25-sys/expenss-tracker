const express = require('express');
const fs = require('fs');

const router = express.Router();

const DB_FILE = './register.json';

router.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    let users = [];

    if (fs.existsSync(DB_FILE)) {
        users = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }

    users.push({ username, email, password });

    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2));

    res.status(201).json({
        message: 'User registered successfully'
    });
});

module.exports = router;