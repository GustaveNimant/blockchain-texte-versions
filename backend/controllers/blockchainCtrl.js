const blocMongooseModel = require('../models/blocMongooseModel');
const blockchainMongooseModel = require('../models/blockchainMongooseModel');

const D = require('../outils/debug');
const O = require('../outils/outils');

function getBlockchainCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js',here,'avec req.body ', req.body)};

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

function createBlocCtrl (bloc) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js',here,'avec bloc',bloc)};

    const blocRecu = new blocMongooseModel({
	index: bloc.index,
	typeContenu: bloc.typeContenu,
	contenu: bloc.contenu,
	horodatage: bloc.horodatage,
	hashPrecedent: bloc.hashPrecedent,
	hashCourant: bloc.hashCourant,
	clePublique: bloc.clePublique
    });
    
    return blocRecu;
};

function submitBlockchainCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainCtrl.js',here,'avec req.body ', req.body)};

    var blocRecus = []
    req.body.forEach( bloc => {
	console.log('bloc',bloc);
	blocRecus.push (createBlocCtrl (bloc));
    });

    const blockchain = new blockchainMongooseModel({
	blocs : blocRecus,
    });
						   
    console.log('Dans',here,'avant le save');
    blockchain.save()
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
        console.log('Dans',here,'après le save');
};

module.exports.getBlockchainCtrl = getBlockchainCtrl;
module.exports.createBlocCtrl = createBlocCtrl;
module.exports.submitBlockchainCtrl = submitBlockchainCtrl;
