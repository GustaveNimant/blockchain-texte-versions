const express = require('express');
const profilRoutes = express.Router();

const profilController = require('../controllers/profil.controller');
//const auth = require('../middleware/auth');

profilRoutes.post('/signup', profilController.signup);
profilRoutes.post('/login', profilController.login); 
profilRoutes.get('/',   profilController.getAllProfilController);
profilRoutes.post('/',  profilController.createProfilController);
profilRoutes.get('/:id',   profilController.getOneProfilByAnyIdController);
profilRoutes.put('/:id',  profilController.modifyProfilController);
profilRoutes.delete('/:id',   profilController.deleteProfilController);

module.exports = profilRoutes;
