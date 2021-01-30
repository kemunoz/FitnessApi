const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../routes/models/user');

router.post('/signup', (req, res, next) => {
    const { username } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            //user already exists
        } else {
            //user does not exist
        }
    });
});

router.get('/login', (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            //user exists
        } else {
            //user does not exist
        }
    });
});

exports.module = router;