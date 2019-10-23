const blocMongooseModel = require('../models/blocMongooseModel');
const D = require('../outils/debug');
const O = require('../outils/outils');

exports.createBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blocCtrl.js.createBlocCtrl avec req.body ', req.body)};

    const bloc = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	clePublique: req.body.clePublique
    });
    
    bloc.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Bloc sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans blocCtrl.js.createBlocCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blocCtrl.js.deleteBlocCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans blocCtrl.js.deleteBlocCtrl avec req.params.id ', req.params.id)};
    
    blocMongooseModel.deleteOne({_id: req.params.id})
	.then(
	    () => {
		res.status(200).json({
		    message: 'Deleted!'
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

exports.getOneBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blocCtrl.js.getOneBlocCtrl avec req.params.id ', req.params.id)};
    
    blocMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (D.debug) {console.log('Dans blocCtrl.js.getOneBlocCtrl tex', tex)};
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

exports.getAllBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blocCtrl.js.getAllBlocCtrl avec req.body ', req.body)};

    blocMongooseModel.find()
	.then(
	    (des_blocs) => {
		res.status(200).json(des_blocs);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.mineBlocCtrl = (req, res, next) => {
//    var here=O.functionNameJS();
    if (D.debug) {console.log('Entrée dans blocCtrl.js.mineBlocCtrl avec req.body ', req.body)};

    const blocRecu = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	clePublique: req.body.clePublique
    });
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
    if (D.debug) {console.log('Dans blocCtrl.js.mineBlocCtrl blocRecu',blocRecu)};
    blocRecu.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Bloc sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans blocCtrl.js.createBlocCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyBlocCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans blocCtrl.js.modifyBlocCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans blocCtrl.js.modifyBlocCtrl avec req.params.id ', req.params.id)};
    
    const bloc = new blocMongooseModel({
	index: req.body.index,
	typeContenu: req.body.typeContenu,
	contenu: req.body.contenu,
	horodatage: req.body.horodatage,
	hashPrecedent: req.body.hashPrecedent,
	hashCourant: req.body.hashCourant,
	clePublique: req.body.clePublique,
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




