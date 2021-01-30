const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
app.use(express.urlencoded());
app.use(express.json());

app.use(helmet());
app.use(compression());

mongoose.connect('mongodb+srv://testUser:<test123>@fitnessjournal.9hmw7.mongodb.net/<FitnessJournal>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

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

app.use('/user', userRoutes);