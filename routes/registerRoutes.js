const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const users = require('../userStore');

router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { username: req.body.username , password: hashedPassword }

        users.push(user)
        res.status(201).json(users);

    } catch (error) {
        res.status(400).send()
    }
    
});

router.get('/', (req, res) => {
    const currUser = req.body;
    res.json(currUser);
});

module.exports = router;