const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');

app.use(express.urlencoded());
app.use(express.json());

app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        '*');
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Requested-With");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE, GET, POST, PATCH');
        return res.status(200).json({});
    }
    next();
});

// User Authentication
app.use('/login', (req, res, next) => {

});
//