const blocMongooseModel = require('../models/blocMongooseModel');
const blockchainMongooseModel = require('../models/blockchainMongooseModel');

const D = require('../outils/debug');
const O = require('../outils/outils');

function createBlocCtrl (bloc) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blocCtrl.js',here,'avec bloc',bloc)};

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

function deleteBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans blocCtrl.js',here,'avec req.body ', req.body)};
    if (D.debug) {console.log('entrée dans blocCtrl.js',here,'avec req.params.id ', req.params.id)};
    
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

function getAllBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blocCtrl.js',here,'avec req.body ', req.body)};

        blocMongooseModel.find()
	.then(
	    (blo_a) => {
		if (D.debug) {console.log('Dans blocCtrl.js',here,'blo_a',blo_a)};
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

function getOneBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans blocCtrl.js',here,'avec req.body ', req.body)};
    
    blocMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (D.debug) {console.log('dans blocCtrl.js.getoneblocctrl tex', tex)};
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

function mineBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans blocCtrl.js',here,'avec req.body ', req.body)};

    const blocRecu = createBlocCtrl (req.body);
    
    if (D.debug) {console.log('Dans blocCtrl.js',here,'bloc reçu',blocRecu)};
    
    blocRecu.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Bloc reçu miné sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans blocCtrl.js',here,'Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
    
};

function modifyBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blocCtrl.js',here,'avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans blocCtrl.js',here,'avec req.params.id ', req.params.id)};
    
    const bloc = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	auteurClePublique: req.body.auteurClePublique,
	_id: req.params.id, /* to keep the_id */
	__v: req.body.__v
    });

    if (D.debug) {console.log('Dans blocCtrl.js.modifyBlocCtrl bloc', bloc)};
    
    blocMongooseModel.updateOne({_id: req.params.id}, bloc)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'blocCtrl.js.modifyBlocCtrl le bloc a été mis à jour!'
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

function saveBlocCtrl (req, res, next) {
    var here=O.functionNameJS();
    if (D.debug) {console.log('entrée dans blocCtrl.js',here,'avec req.body ', req.body)};

    const bloc = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	auteurClePublique: req.body.auteurClePublique
    });
    bloc.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'bloc sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('dans blocCtrl.js.createblocctrl erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

module.exports.saveBlocCtrl = saveBlocCtrl;
module.exports.deleteBlocCtrl = deleteBlocCtrl;
module.exports.getAllBlocCtrl = getAllBlocCtrl;
module.exports.getOneBlocCtrl = getOneBlocCtrl;
module.exports.mineBlocCtrl = mineBlocCtrl;
module.exports.modifyBlocCtrl = modifyBlocCtrl;



