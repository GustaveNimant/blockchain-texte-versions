const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const pairController = require('../controllers/pair.controller');

router.get('/', pairController.getAllPairController);
router.post('/savePair', pairController.savePairController);
router.get('/:id', pairController.getOnePairController);
router.put('/:id', auth, multer, pairController.modifyPairController);  /* put  route modified */
router.delete('/:id', auth, pairController.deletePairController);

module.exports = router;
