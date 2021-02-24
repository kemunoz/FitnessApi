const mongoose = require('mongoose');
const Workout = require('../routes/models/workout');


exports.get = (req, res, next) => {
    const { userId } = req.params;
    Workout.find({ userId }, (err, docs) => {
        err ? res.status(400).json({ message: "ERROR" }) : res.status(200).json({ workouts: docs });
    });
};

exports.create = async (req, res, next) => {

    const { userId } = req.params;
    const { exercises } = req.body;
    const map = exercises.map((exercise) => {
        return {
            title: exercise.title,
            detail: exercise.detail
        }
    });
    const workout = new Workout({
        _id: new mongoose.Types.ObjectId(),
        userId,
        title: req.body.title,
        summary: req.body.summary,
        exercises: map
    });
    const newWorkout = await workout.save();
    newWorkout === true ?
        res.status(200).json({
            created: true,
            message: 'WORKOUT_CREATED'
        }) :
        res.status(400).json({
            created: false,
            message: 'WOKROUT_FAILED'
        });
};