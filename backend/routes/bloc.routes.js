const express = require('express');
const router = express.Router();

const blocController = require('../controllers/bloc.controller');

router.get('/', blocController.getAllBlocController);
router.post('/', blocController.getAllBlocController);
router.post('/broadcast',  blocController.broadcastAllBlocController);
router.post('/saveBloc',  blocController.saveBlocController);
router.post('/mineBloc',  blocController.mineBlocController);
router.get('/:id',   blocController.getOneBlocController);
router.put('/:id',  blocController.modifyBlocController);
router.delete('/:id',   blocController.deleteBlocController);

module.exports = router;
