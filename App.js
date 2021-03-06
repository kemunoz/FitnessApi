const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
const workoutRoutes = require('./api/routes/workout');
const jwt = require('jsonwebtoken');
app.use(express.urlencoded());
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

mongoose.connect('mongodb+srv://testUser:test123@fitnessjournal.9hmw7.mongodb.net/FitnessJournal?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",
        '*');
    res.header("Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept, Authorization, X-Requested-With");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, DELETE, GET, POST, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, 'secret', (err, user) => {
            if (err) {
                res.status(401).json({
                    message: 'BAD_TOKEN'
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({
            message: 'NO_AUTHHEADER'
        });
    }
});
app.use('/workout', workoutRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.number = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.number || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
