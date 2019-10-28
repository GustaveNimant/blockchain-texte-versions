const express = require('express');
const router = express.Router();

const blocController = require('../controllers/bloc.controller');

router.get('/', blocController.getAllBlocController);
router.post('/', blocController.getAllBlocController);
router.post('/mineBlock',  blocController.mineBlocController);
router.get('/:id',   blocController.getOneBlocController);
router.put('/:id',  blocController.modifyBlocController);
router.delete('/:id',   blocController.deleteBlocController);

module.exports = router;
