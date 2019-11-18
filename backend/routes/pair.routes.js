const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const pairController = require('../controllers/pair.controller');

router.get('/', pairController.getAllPairController);
router.get('/connectAllPair', pairController.connectAllPairController);
router.get('/connectOnePair/:id', pairController.connectOnePairController);
router.post('/savePair', pairController.savePairController);
router.get('/:id', pairController.getOnePairController);
router.put('/:id', auth, multer, pairController.modifyPairController);  /* put  route modified */
router.delete('/:id', auth, pairController.deletePairController);

module.exports = router;
