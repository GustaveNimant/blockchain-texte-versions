const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

const texteController = require('../controllers/texte.controller');

router.get('/', texteController.getAllTexteController);
router.post('/', auth, texteController.createTexteController); /* post route modified */
router.post('/:id', auth, texteController.createTexteController); /* post route modified */ 
router.get('/:id', texteController.getOneTexteController);
router.put('/:id', auth, multer, texteController.modifyTexteController);  /* put  route modified */
router.delete('/:id', auth, texteController.deleteTexteController);

module.exports = router;
