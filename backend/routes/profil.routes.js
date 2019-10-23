const express = require('express');
const profilRoutes = express.Router();

const profilCtrl = require('../controllers/profilCtrl');
//const auth = require('../middleware/auth');

profilRoutes.post('/signup', profilCtrl.signup);
profilRoutes.post('/login', profilCtrl.login); 
profilRoutes.get('/',   profilCtrl.getAllProfilCtrl);
profilRoutes.post('/',  profilCtrl.createProfilCtrl);
profilRoutes.get('/:id',   profilCtrl.getOneProfilByAnyIdCtrl);
profilRoutes.put('/:id',  profilCtrl.modifyProfilCtrl);
profilRoutes.delete('/:id',   profilCtrl.deleteProfilCtrl);

module.exports = profilRoutes;
