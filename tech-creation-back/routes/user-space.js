const express = require('express');
const souscriptionController = require('../controllers/user-space');
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/user', auth, souscriptionController.getUser);
router.post('/epargne', auth, souscriptionController.getEpargne);
router.post('/serveurMining', auth, souscriptionController.getServeurMining);
 
module.exports = router;