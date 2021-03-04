const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../routes/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            res.status(409).json({
                message: 'USER_ALREADY_EXISTS'
            });
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    username,
                    password: hash
                });
                const user = await newUser.save();
                if (user === newUser) {
                    res.status(200).json({
                        message: "USER_CREATED"
                    });
                } else {
                    res.status(409).json({
                        message: "ERROR"
                    });
                }
            });
        }
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (user) {
            const passwordDB = user.password;
            bcrypt.compare(password, passwordDB, async (err, result) => {
                if (result == true) {
                    const userToken = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret');
                    res.status(200).json({
                        message: "LOGGED_IN",
                        userToken,
                        payload: { id: user._id }
                    });
                } else {
                    res.status(404).json({
                        message: "USERNAME_OR_PASSWORD_INCORRECT"
                    });
                }
            });

        } else {
            res.status(404).json({
                message: "USER_NOT_FOUND"
            });
        }
    });
};

exports.refresh = async (req, res, next) => {
    const { refreshToken } = req.body;
    jwt.verify(refreshToken, 'secret', async (err, user) => {
        if (err) {
            res.status(400).json({
                err: err
            });
        } else {
            const token = await jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60) }, 'secret');
            res.status(200).json({
                token
            });
        }
    });
};