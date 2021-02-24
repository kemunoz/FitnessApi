const mongoose = require('mongoose');
const { Schema } = mongoose;
const workoutSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, required: true },
    title: String,
    summary: { type: String, default: '' },
    exercises: []
});

module.exports = mongoose.model('Workout', workoutSchema);