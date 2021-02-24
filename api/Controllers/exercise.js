const mongoose = require('mongoose');
const Exercise = require('../routes/models/exercise');

exports.get = (req, res, next) => {
    const { userId } = req.params;
    const { exerciseTitle } = req.params;
    Exercise.find({ exerciseTitle }, (err, docs) => {
        res.status(200).json({
            payload: docs
        });
    })
};