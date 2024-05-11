require('dotenv').config()
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const users = require('../userStore');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    

    const user = users.find(u => u.username === req.body.username)

    if(!user) return res.status(400).send("user not found")

    try {
        if(await bcrypt.compare(req.body.password, user.password)) {

            const token = jwt.sign( { username: user.username } , process.env.secret , { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({token});
        }
        else {
            res.send("wrong pass")
        }
    } catch {
        res.status(400).send("error in login");
    }

});

module.exports = router;