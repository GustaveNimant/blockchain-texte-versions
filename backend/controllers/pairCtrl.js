const pairMongooseModel = require('../models/pairMongooseModel');
const D = require('../outils/debug');

exports.createPairCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairCtrl.js.createPairCtrl avec req.body ', req.body)};

    const pair = new pairMongooseModel({
	texteObjectId: req.body.texteObjectId,
	assertionList: req.body.assertionList,
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
		if (D.debug) {console.log('Dans pairCtrl.js.createPairCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deletePairCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairCtrl.js.deletePairCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans pairCtrl.js.deletePairCtrl avec req.params.id ', req.params.id)};
    
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


exports.getOnePairCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairCtrl.js.getOnePairCtrl avec req.params.id ', req.params.id)};
    
    pairMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (D.debug) {console.log('Dans pairCtrl.js.getOnePairCtrl tex', tex)};
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

exports.getAllPairCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairCtrl.js.getAllPairCtrl avec req.body ', req.body)};

    pairMongooseModel.find()
	.then(
	    (des_pairs) => {
		res.status(200).json(des_pairs);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.modifyPairCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairCtrl.js.modifyPairCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans pairCtrl.js.modifyPairCtrl avec req.params.id ', req.params.id)};
    
    const pair = new pairMongooseModel({
	texteObjectId: req.body.texteObjectId,
	assertionList: req.body.assertionList,
	_id: req.params.id, /* to keep the_id */
	__v: req.body.__v
    });

    if (D.debug) {console.log('Dans pairCtrl.js.modifyPairCtrl pair', pair)};
    
    pairMongooseModel.updateOne({_id: req.params.id}, pair)  /* version updated ??? */
	.then(
	    () => {
		res.status(201).json({
		    message: 'pairCtrl.js.modifyPairCtrl le pair a été mis à jour!'
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




