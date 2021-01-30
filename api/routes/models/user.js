const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    username: String,
    password: String
});

module.exports = mongoose.model('User', userSchema); 