const blocMongooseModel = require('../models/blocMongooseModel');

const D = require('../outils/debug');
const O = require('../outils/outils');

exports.getBlockchainCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js.getBlockchainCtrl avec req.body ', req.body)};

    blocMongooseModel.find()
	.then(
	    (une_blockchain) => {
		res.status(200).json(une_blockchain);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.createBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js.createBlocCtrl avec req.body ', req.body)};

    console.log('Dans blockchainCtrl.js.createBlocCtrl req.body', req.body);

    const blocRecu = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	clePublique: req.body.clePublique
    });
    
    blocRecu.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Blockchain sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans blockchainCtrl.js.createBlockchainCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.submitBlockchainCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js.submitBlockchainCtrl avec req.body ', req.body)};

    console.log('Dans blockchainCtrl.js.submitBlockchainCtrl req.body', req.body);
    req.body.forEach( i => {
	createBlocCtrl (req[i]);
    })
    
};

