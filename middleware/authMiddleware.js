require('dotenv').config()
const jwt = require('jsonwebtoken');
const users = require('../userStore');

async function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send('Token is missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.secret);
        const username = decoded.username;

        const user = users.find(u => u.username === username);
        if (!user) {
            return res.status(401).send('User not found');
        }

        req.user = user;

        next();
    }
    catch (error) {
        res.clearCookie("token");
        return res.status(401).send('Invalid token');
    }
}

module.exports = { verifyToken };
