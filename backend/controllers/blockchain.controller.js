const blockchainMongooseModel = require('../models/blockchain.mongoose.model');
const blocMongooseModel = require('../models/bloc.mongoose.model');

const D = require('../outils/debug');
const O = require('../outils/outils');

function createBlocController (bloc) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainController.js',here,'avec bloc',bloc)};

    const blocRecu = new blocMongooseModel({
	index: bloc.index,
	typeContenu: bloc.typeContenu,
	contenu: bloc.contenu,
	horodatage: bloc.horodatage,
	auteurClePublique: bloc.auteurClePublique,
	hashPrecedent: bloc.hashPrecedent,
	hashCourant: bloc.hashCourant,
    });
    
    return blocRecu;
};

function getBlockchainController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainController.js',here,'avec req.body ', req.body)};

    blockchainMongooseModel.find()
	.then(
	    (blo) => {
		if (D.debug) {console.log('Dans',here,'la blockchain',blo)};
		res.status(200).json(blo);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function submitBlockchainController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blockchainController.js',here,'avec req.body ', req.body)};

    var blocRecus = [];
    req.body.forEach( bloc => {
	console.log('bloc',bloc);
	blocRecus.push (createBlocController (bloc));
    });

    const blockchain = new blockchainMongooseModel({
	blocs : blocRecus,
    });
						   
    console.log('Dans',here,'avant le save');
    blockchain.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Blockchain sauvée !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans blockchainController.js.createBlockchainController Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
        console.log('Dans',here,'après le save');
};

module.exports.getBlockchainController = getBlockchainController;
module.exports.createBlocController = createBlocController;
module.exports.submitBlockchainController = submitBlockchainController;
