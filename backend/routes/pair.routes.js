const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const pairCtrl = require('../controllers/pairCtrl');

router.get('/', pairCtrl.getAllPairCtrl);
router.post('/', auth, pairCtrl.createPairCtrl); /* post route modified */
router.get('/:id', pairCtrl.getOnePairCtrl);
router.put('/:id', auth, multer, pairCtrl.modifyPairCtrl);  /* put  route modified */
router.delete('/:id', auth, pairCtrl.deletePairCtrl);

module.exports = router;
