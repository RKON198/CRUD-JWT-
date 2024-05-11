require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 3001;
const {verifyToken} = require('./middleware/authMiddleware.js');

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


const productRoute = require('./routes/api/productRoutes.js');

const registerRoute = require('./routes/registerRoutes.js');
const loginRoute = require('./routes/loginRoutes.js');

app.use("/api/product", verifyToken, productRoute);

app.use("/register",registerRoute);
app.use("/login",loginRoute);