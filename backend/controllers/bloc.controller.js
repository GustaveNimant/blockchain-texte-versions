const blocMongooseModel = require('../models/bloc.mongoose.model');
const blockchainMongooseModel = require('../models/blockchain.mongoose.model');

const D = require('../outils/debug');
const O = require('../outils/outils');

function createBlocController (bloc) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans bloc.controller.js',here,'avec bloc',bloc)};

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

function deleteBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans bloc.controller.js',here,'avec req.body ', req.body)};
    if (D.debug) {console.log('entrée dans bloc.controller.js',here,'avec req.params.id ', req.params.id)};
    
    blocMongooseModel.deleteone({_id: req.params.id})
	.then(
	    () => {
		res.status(200).json({
		    message: 'deleted!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function getAllBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans bloc.controller.js',here,'avec req.body ', req.body)};

        blocMongooseModel.find()
	.then(
	    (blo_a) => {
		if (D.debug) {console.log('Dans bloc.controller.js',here,'blo_a',blo_a)};
		res.status(200).json(blo_a);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function getOneBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans bloc.controller.js',here,'avec req.body ', req.body)};
    
    blocMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (D.debug) {console.log('dans bloc.controller.js.getoneblocctrl tex', tex)};
		res.status(200).json(tex);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

function mineBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans bloc.controller.js',here,'avec req.body ', req.body)};

    const blocRecu = createBlocController (req.body);
    
    if (D.debug) {console.log('Dans bloc.controller.js',here,'bloc reçu',blocRecu)};
    
    blocRecu.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Bloc reçu miné sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans bloc.controller.js',here,'Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
    
};

function modifyBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans bloc.controller.js',here,'avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans bloc.controller.js',here,'avec req.params.id ', req.params.id)};
    
    const bloc = createBlocController(req.body);

    if (D.debug) {console.log('Dans bloc.controller.js.modifyBlocController bloc', bloc)};
    
    blocMongooseModel.updateOne({_id: req.params.id}, bloc)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'bloc.controller.js.modifyBlocController le bloc a été mis à jour!'
		});
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function saveBlocController (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans bloc.controller.js',here,'avec req.body ', req.body)};

    const bloc = createBlocController(req.body);
    bloc.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'bloc sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans bloc.controller.js',here,'Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

module.exports.saveBlocController = saveBlocController;
module.exports.deleteBlocController = deleteBlocController;
module.exports.getAllBlocController = getAllBlocController;
module.exports.getOneBlocController = getOneBlocController;
module.exports.mineBlocController = mineBlocController;
module.exports.modifyBlocController = modifyBlocController;



