const mongoose = require('mongoose');
const { Schema } = mongoose;

const exercise = new Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    detail: String,
    summary: String
})

const workoutSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    title: String,
    summary: String,
    exercises: [exercise]
});

module.exports = mongoose.model('Workout', workoutSchema);