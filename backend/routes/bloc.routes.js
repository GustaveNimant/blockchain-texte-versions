const express = require('express');
const router = express.Router();

const blocCtrl = require('../controllers/blocCtrl');

router.get('/',   blocCtrl.getAllBlocCtrl);
router.post('/',  blocCtrl.createBlocCtrl);
router.get('/:id',   blocCtrl.getOneBlocCtrl);
router.put('/:id',  blocCtrl.modifyBlocCtrl);
router.delete('/:id',   blocCtrl.deleteBlocCtrl);

module.exports = router;
