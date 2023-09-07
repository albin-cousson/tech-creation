const express = require('express');
const auth = require('../middleware/auth')
const mutler = require('../middleware/multer-config')
const actuController = require('../controllers/actu');

const router = express.Router();

router.post('/read', actuController.getActu);
router.post('/add', mutler, actuController.addArticle);
router.post('/addImageArticle', mutler, actuController.addImageArticle);
router.put('/put/:id', mutler, actuController.putArticle);
router.delete('/delete/:id', actuController.deleteArticle);

module.exports = router;  