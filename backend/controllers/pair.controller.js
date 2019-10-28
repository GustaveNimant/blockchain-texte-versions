const pairMongooseModel = require('../models/pair.mongoose.model');
const D = require('../outils/debug');

exports.createPairController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairController.js.createPairController avec req.body ', req.body)};

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
		if (D.debug) {console.log('Dans pairController.js.createPairController Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deletePairController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairController.js.deletePairController avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans pairController.js.deletePairController avec req.params.id ', req.params.id)};
    
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


exports.getOnePairController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairController.js.getOnePairController avec req.params.id ', req.params.id)};
    
    pairMongooseModel.findOne({
	_id: req.params.id
    })
	.then(
	    (tex) => {
		if (D.debug) {console.log('Dans pairController.js.getOnePairController tex', tex)};
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

exports.getAllPairController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairController.js.getAllPairController avec req.body ', req.body)};

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

exports.modifyPairController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans pairController.js.modifyPairController avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans pairController.js.modifyPairController avec req.params.id ', req.params.id)};
    
    const pair = new pairMongooseModel({
	texteObjectId: req.body.texteObjectId,
	assertionList: req.body.assertionList,
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




