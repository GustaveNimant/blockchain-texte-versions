'use strict';

const pairMongooseModel = require('../models/pair.mongoose.model');

const A = require('../outils/arrays.js');
const D = require('../outils/debug');
const O = require('../outils/outils');
const WS = require('../outils/websocket');

const ModuleName = 'pair.controller.js';

var connectAllPairController = (req, res, next) => {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.body', req.body)};

    pairMongooseModel.find()
	.then(
	    (pai_a) => {
		if (D.debug) {console.log('dans',here,'pai_a', pai_a)};
		var pai_url_a = [];
		pai_a.forEach (pai => {
		    if (D.debug) {console.log('dans',here,'pai', pai)};
		    pai_url_a.push(pai.url);
		});
		WS.connectToPeerUrls (pai_url_a, here)
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('dans',here,'Erreur',error)};
		
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function connectOnePairController (req, res, next) {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.params.id', req.params.id)};
    
    pairMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (pai) => {
		if (D.debug) {console.log('Dans',here,'pai', pai)};
		WS.connectToPeerUrl (pai.url, here);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

function createPairController (pair) {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans pair.controller.js',here,'avec pair',pair)};

    const pairRecu = new pairMongooseModel({
	url: pair.url,
    });
    
    return pairRecu;
};

exports.deletePairController = (req, res, next) => {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.body', req.body)};
    if (D.debug) {console.log('Entrée dans',here,'avec req.params.id', req.params.id)};
    
    pairMongooseModel.deleteOne({_id: req.params.id})
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

var getAllPairController = (req, res, next) => {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.body', req.body)};

    pairMongooseModel.find()
	.then(
	    (pai_a) => {
		if (D.debug) {console.log('Dans',here,'pai_a', pai_a)};
		res.status(200).json(pai_a);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

function getOnePairController (req, res, next) {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.params.id', req.params.id)};
    
    pairMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (pai) => {
		if (D.debug) {console.log('Dans',here,'pai', pai)};
		res.status(200).json(pai);
	    }
	).catch(
	    (error) => {
		res.status(404).json({
		    error: error
		});
	    }
	);
};

exports.modifyPairController = (req, res, next) => {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entrée dans',here,'avec req.body', req.body)};
    if (D.debug) {console.log('Entrée dans',here,'avec req.params.id', req.params.id)};
    
    const pair = new pairMongooseModel({
	url: req.body.url,
	_id: req.params.id, /* to keep the_id */
	__v: req.body.__v
    });

    if (D.debug) {console.log('Dans pairController.js.modifyPairController pair', pair)};
    
    pairMongooseModel.updateOne({_id: req.params.id}, pair)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'pairController.js.modifyPairController le pair a été mis à jour!'
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

exports.savePairController = (req, res, next) => {
    var here = O.functionNameJS(ModuleName);
    if (D.debug) {console.log('Entre dans',here,'avec req.body', req.body)};

    const pair = new pairMongooseModel({
	url: req.body.url,
    });
    
    pair.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    
	    (error) => {
		if (D.debug) {console.log('Dans pairController.js.createPairController Erreur', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

module.exports.connectAllPairController = connectAllPairController;
module.exports.connectOnePairController = connectOnePairController;
module.exports.getAllPairController = getAllPairController;
module.exports.getOnePairController = getOnePairController;
