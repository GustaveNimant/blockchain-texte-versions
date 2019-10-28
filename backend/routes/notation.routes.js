const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const notationController = require('../controllers/notation.controller');

router.get('/', notationController.getAllNotationController);
router.post('/', auth, notationController.createNotationController); 
router.get('/:id', auth, notationController.getOneNotationController);
router.get('/byoid/:texteObjectId', notationController.getNotationsByTexteObjectIdController);
router.get('/oandp/:TexteObjectIdAndParticipantId', notationController.getNotationsByTexteObjectIdAndParticipantIdController);
router.delete('/:id', auth, notationController.deleteNotationController);

module.exports = router;
