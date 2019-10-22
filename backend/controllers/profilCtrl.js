const profilMongooseModel = require('../models/profilMongooseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Debug = require('../outils/debug');
const validateEmail = require('../outils/outils');

exports.createProfilCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.createProfilCtrl avec req.body ', req.body)};

    const profil = new profilMongooseModel({
	pseudo: req.body.pseudo,
	email: req.body.email,
	password: req.body.password,
    });
    
    profil.save()
	.then(
	    () => {
		res.status(201).json({
		    message: 'Post sauvé !'
		});
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans profilCtrl.js.createProfilCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteProfilCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.deleteProfilCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.deleteProfilCtrl avec req.params.id ', req.params.id)};
    
    profilMongooseModel.deleteOne({_id: req.params.id})
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

exports.getProfilCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.getProfilCtrl avec req.body ', req.body)};

    profilMongooseModel.find()
	.then(
	    (le_profil) => {
		res.status(200).json(le_profil);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.login = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.login avec req.body',req.body)};
    if (Debug.debug) {console.log('Dans profilCtrl.js.login req.body.email', req.body.email)};

    profilMongooseModel.findOne({ email: req.body.email }).
	then( /* mongoose method */
	    (un_profil) => {
		if (Debug.debug) {console.log('Dans profilCtrl.js.login un_profil', un_profil)};

		if (!un_profil) {
		    return res.status(401).json({
			error: new Error('Dans profilCtrl.js.login Erreur : Profil inconnu!')
		    });
		}
		if (Debug.debug) {console.log('Dans profilCtrl.js.login req.body.password', req.body.password)};
		if (Debug.debug) {console.log('Dans profilCtrl.js.login un_profil.password', un_profil.password)};
		bcrypt.compare(req.body.password, un_profil.password)
		    .then(
			(valid) => {
			    if (Debug.debug) {console.log('Dans profilCtrl.js.login bcrypt.compare est', valid)};
			    
			    if (!valid) {
				return res.status(401).json({
				    error: new Error('profilCtrl.js.login : le password est incorrect!')
				});
			    }

			    const token = jwt.sign( /* JWT encode new token */
				{ userId: un_profil._id },
				'RANDOM_TOKEN_SECRET',
				{ expiresIn: '7d' });
			    
			    if (Debug.debug) {console.log('Dans profilCtrl.js.login nouveau token', token)};
			    res.status(200).json({
				userId: un_profil._id,
				token: token
			    });   
			}
		    ).catch(
			(error) => {
			    if (Debug.debug) {console.log('Dans profilCtrl.js.login Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			}
		    );
	    }
	).catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans profilCtrl.js.login email inconnu',req.body.email)};
		res.status(500).json({
		    error: error
		});
	    }
	);
};

exports.modifyProfilCtrl = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.modifyProfilCtrl avec req.body ', req.body)};
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.modifyProfilCtrl avec req.params.id ', req.params.id)};
    
    const profil = new profilMongooseModel({
	_id: req.params.id, /* to keep the_id */
	pseudo: req.body.pseudo,
	email: req.body.email,
	password: req.body.password,
    });

    profilMongooseModel.updateOne({_id: req.params.id}, profil)
	.then(
	    () => {
		res.status(201).json({
		    message: 'profilMongooseModel updated successfully!'
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

exports.signup = (req, res, next) => {
    if (Debug.debug) {console.log('Entrée dans profilCtrl.js.signup avec req.body',req.body)};

    bcrypt.hash(req.body.password, 10)
	.then(
	    (a_password_hash) => {
		if (Debug.debug) {console.log('Dans profilCtrl.js.signup a_password_hash', a_password_hash)};
		if (Debug.debug) {console.log('Dans profilCtrl.js.signup req.body.password', req.body.password)};

		const profil = new profilMongooseModel({
		    pseudo: req.body.pseudo,
		    email: req.body.email,
		    password: a_password_hash
		});

		if (Debug.debug) {console.log('Dans profilCtrl.js.signup profil', profil)};
		profil.save() /* dans BD */
		    .then(
			() => {
			    res.status(201).json({
				message: 'Profil ajoutée avec succès!'
			    });
			})
		    .catch(
			(error) => {
			    if (Debug.debug) {console.log('Dans profilCtrl.js.signup a_password_hash', a_password_hash)};
			    if (Debug.debug) {console.log('Dans profilCtrl.js.signup Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			});
	    }
	)
	.catch(
	    (error) => {
		if (Debug.debug) {console.log('Dans profilCtrl.js.signup Erreur', error)};
		res.status(550).json({
		    error: error
		});
	    });
};

