const express = require('express');
const auth = require('../middleware/auth')
const signInController = require('../controllers/sign-in');

const router = express.Router();

router.post('/', signInController.login);

module.exports = router;