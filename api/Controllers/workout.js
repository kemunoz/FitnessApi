const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const workout = require('../routes/models/workout');


exports.get = (req, res, next) => {
    const { userId } = req.params;

}

exports.create = (req, res, next) => {
    const newWorkout = new workout({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title;
        summary: req.body.summary //make this default to an empty string
    });
}