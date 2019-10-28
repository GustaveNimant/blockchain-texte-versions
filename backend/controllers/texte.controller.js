const texteMongooseModel = require('../models/texte.mongoose.model');
const Debug = require('../outils/debug');
const bcrypt = require('bcrypt');

exports.createTexteController = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteController.js.createTexteController avec req.body ', req.body)};

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
		if (Debug.debug) {console.log('Dans texteController.js.createTexteController Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteTexteController = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteController.js.deleteTexteController avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteController.js.deleteTexteController avec req.params.id ', req.params.id)};
    
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


exports.getOneTexteController = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteController.js.getOneTexteController avec req.params.id ', req.params.id)};
    
    texteMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (Debug.debug) {console.log('Dans texteController.js.getOneTexteController tex', tex)};
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

exports.getAllTexteController = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteController.js.getAllTexteController avec req.body ', req.body)};

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

exports.modifyTexteController = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans texteController.js.modifyTexteController avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans texteController.js.modifyTexteController avec req.params.id ', req.params.id)};
    
    const texte = new texteMongooseModel({
	_id: req.params.id, /* to keep the_id */
	contenu: req.body.contenu,
	auteurClePublique: req.body.auteurClePublique,
    });

    if (Debug.debug) {console.log('Dans texteController.js.modifyTexteController texte', texte)};
    
    texteMongooseModel.updateOne({_id: req.params.id}, texte)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'texteController.js.modifyTexteController le texte a été mis à jour!'
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




