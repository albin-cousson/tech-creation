const express = require('express');
const signUpController = require('../controllers/sign-up');

const router = express.Router();

router.post('/', signUpController.createUser);

module.exports = router;