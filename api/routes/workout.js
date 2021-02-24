const express = require('express');
const router = express.Router();
const workoutController = require('../Controllers/workout');

router.post('/:userId', workoutController.create);
router.get('/:userId', workoutController.get);

module.exports = router;