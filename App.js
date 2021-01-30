const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const mongoose = require('mongoose');
const User = require('./api/routes/models/user');

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

// User Authentication: signup
app.use('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, result) => {
        if (result) {
            //user already exists
        } else {
            //create a new user
        }
    });

});

//User Authentication: login
//if jwt is invalid then the user will get anew one
//only if the username and answers are correct

app.use('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, result) => {
        if (result) {
            //user exists
        } else {
            //user does not exist
        }
    });
});
