const profilMongooseModel = require('../models/profil.mongoose.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const D = require('../outils/debug');
const O = require('../outils/outils');

exports.createProfilController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.createProfilController avec req.body ', req.body)};

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
		if (D.debug) {console.log('Dans profilController.js.createProfilController Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteProfilController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.deleteProfilController avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilController.js.deleteProfilController avec req.params.id ', req.params.id)};
    
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

exports.getAllProfilController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.getAllProfilController avec req.body ', req.body)};

    profilMongooseModel.find()
	.then(
	    (des_profils) => {
		res.status(200).json(des_profils);
	    }
	).catch(
	    (error) => {
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.getOneProfilByAnyIdController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.getOneProfilByAnyIdController avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilController.js.getOneProfilByAnyIdController avec req.params.id ', req.params.id)};

    var str = req.params.id;
    var boo = O.isValidEmail(req.params.id);
    if (D.debug) {console.log('Dans profilController.js.getOneProfilByAnyIdController str',str,'isValidEmail',boo)};
    if (boo) {
	profilMongooseModel.findOne({
	    email: str
	})
	    .then(
		(profil) => {
		    if (D.debug) {console.log('Dans profilController.js.getOneProfilByAnyIdController by email profil',profil)};
		    res.status(200).json(profil);
		}
	    ).catch(
		(error) => {
		    if (D.debug) {console.log('Dans profilController.js.getOneProfilByAnyIdController Erreur',error)};
		    res.status(404).json({
			error: error
		    });
		}
	);
	
    } else {
	profilMongooseModel.findOne({
	    _id: str
	})
	    .then(
		(profil) => {
		    if (D.debug) {console.log('Dans profilController.js.getOneProfilByAnyIdController by _id profil',profil)};
		    res.status(200).json(profil);
		}
	    ).catch(
		(error) => {
		    res.status(404).json({
			error: error
		    });
		}
	    );
    }
};

exports.login = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.login avec req.body',req.body)};
    if (D.debug) {console.log('Dans profilController.js.login req.body.email', req.body.email)};

    profilMongooseModel.findOne({ email: req.body.email }).
	then( /* mongoose method */
	    (un_profil) => {
		if (D.debug) {console.log('Dans profilController.js.login un_profil', un_profil)};

		if (!un_profil) {
		    return res.status(401).json({
			error: new Error('Dans profilController.js.login Erreur : Profil inconnu!')
		    });
		}
		if (D.debug) {console.log('Dans profilController.js.login req.body.password', req.body.password)};
		if (D.debug) {console.log('Dans profilController.js.login un_profil.password', un_profil.password)};
		bcrypt.compare(req.body.password, un_profil.password)
		    .then(
			(valid) => {
			    if (D.debug) {console.log('Dans profilController.js.login bcrypt.compare est', valid)};
			    
			    if (!valid) {
				return res.status(401).json({
				    error: new Error('profilController.js.login : le password est incorrect!')
				});
			    }

			    const token = jwt.sign( /* JWT encode new token */
				{ userId: un_profil._id },
				'RANDOM_TOKEN_SECRET',
				{ expiresIn: '7d' });
			    
			    if (D.debug) {console.log('Dans profilController.js.login nouveau token', token)};
			    res.status(200).json({
				userId: un_profil._id,
				token: token
			    });   
			}
		    ).catch(
			(error) => {
			    if (D.debug) {console.log('Dans profilController.js.login Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			}
		    );
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans profilController.js.login email inconnu',req.body.email)};
		res.status(500).json({
		    error: error
		});
	    }
	);
};

exports.modifyProfilController = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilController.js.modifyProfilController avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilController.js.modifyProfilController avec req.params.id ', req.params.id)};
    
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
    if (D.debug) {console.log('Entrée dans profilController.js.signup avec req.body',req.body)};

    bcrypt.hash(req.body.password, 10)
	.then(
	    (a_password_hash) => {
		if (D.debug) {console.log('Dans profilController.js.signup a_password_hash', a_password_hash)};
		if (D.debug) {console.log('Dans profilController.js.signup req.body.password', req.body.password)};

		const profil = new profilMongooseModel({
		    pseudo: req.body.pseudo,
		    email: req.body.email,
		    password: a_password_hash
		});

		if (D.debug) {console.log('Dans profilController.js.signup profil', profil)};
		profil.save() /* dans BD */
		    .then(
			() => {
			    res.status(201).json({
				message: 'Profil ajoutée avec succès!'
			    });
			})
		    .catch(
			(error) => {
			    if (D.debug) {console.log('Dans profilController.js.signup a_password_hash', a_password_hash)};
			    if (D.debug) {console.log('Dans profilController.js.signup Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			});
	    }
	)
	.catch(
	    (error) => {
		if (D.debug) {console.log('Dans profilController.js.signup Erreur', error)};
		res.status(550).json({
		    error: error
		});
	    });
};

