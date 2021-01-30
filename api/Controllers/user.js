const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../routes/models/user');

exports.signup = async (req, res, next) => {
    const { username } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            res.status(409).json({
                message: 'USER_ALREADY_EXISTS'
            });
        } else {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username,
                password
            });
            const user = newUser.save();
            if (user === newUser) {
                res.status(200).json({
                    message: "USER_CREATED"
                });
            } else {
                res.status(409).json({
                    message: "ERROR"
                });
            }

        }
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            //user exists
        } else {
            //user does not exist
        }
    });
};