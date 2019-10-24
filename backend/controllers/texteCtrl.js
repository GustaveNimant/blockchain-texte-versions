const texteMongooseModel = require('../models/texteMongooseModel');
const Debug = require('../outils/debug');
const bcrypt = require('bcrypt');

exports.createTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.createTexteCtrl avec req.body ', req.body)};

    const texte = new texteMongooseModel({
	contenu: req.body.contenu,
	auteurClePublique: req.body.auteurClePublique,
    });
    
    texte.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans texteCtrl.js.createTexteCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.deleteTexteCtrl avec req.params.id ', req.params.id)};
    
    texteMongooseModel.deleteOne({_id: req.params.id})
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


exports.getOneTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.getOneTexteCtrl avec req.params.id ', req.params.id)};
    
    texteMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (Debug.debug) {console.log('Dans texteCtrl.js.getOneTexteCtrl tex', tex)};
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

exports.getAllTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.getAllTexteCtrl avec req.body ', req.body)};

    texteMongooseModel.find()
	.then(
	    (tex_a) => {
		res.status(200).json(tex_a);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyTexteCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteCtrl.js.modifyTexteCtrl avec req.params.id ', req.params.id)};
    
    const texte = new texteMongooseModel({
	_id: req.params.id, /* to keep the_id */
	contenu: req.body.contenu,
	auteurClePublique: req.body.auteurClePublique,
    });

    if (Debug.debug) {console.log('Dans texteCtrl.js.modifyTexteCtrl texte', texte)};
    
    texteMongooseModel.updateOne({_id: req.params.id}, texte)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'texteCtrl.js.modifyTexteCtrl le texte a été mis à jour!'
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




