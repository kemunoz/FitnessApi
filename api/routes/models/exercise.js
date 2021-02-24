const mongoose = require('mongoose');
const { Schema } = mongoose;

const exerciseSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    title: String,
    detail: String,
    summary: String
});

exports.module = mongoose.model('Exercise', exerciseSchema);