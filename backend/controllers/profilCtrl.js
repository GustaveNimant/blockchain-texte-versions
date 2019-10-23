const profilMongooseModel = require('../models/profilMongooseModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const D = require('../outils/debug');
const O = require('../outils/outils');

exports.createProfilCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilCtrl.js.createProfilCtrl avec req.body ', req.body)};

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
		if (D.debug) {console.log('Dans profilCtrl.js.createProfilCtrl Erreur ', error)};
		res.status(400).json({
		    error: error
		});
	    }
	);
};

exports.deleteProfilCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilCtrl.js.deleteProfilCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilCtrl.js.deleteProfilCtrl avec req.params.id ', req.params.id)};
    
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

exports.getAllProfilCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilCtrl.js.getAllProfilCtrl avec req.body ', req.body)};

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

exports.getOneProfilByAnyIdCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilCtrl.js.getOneProfilByAnyIdCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilCtrl.js.getOneProfilByAnyIdCtrl avec req.params.id ', req.params.id)};

    var str = req.params.id;
    var boo = O.isValidEmail(req.params.id);
    if (D.debug) {console.log('Dans profilCtrl.js.getOneProfilByAnyIdCtrl str',str,'isValidEmail',boo)};
    if (boo) {
	profilMongooseModel.findOne({
	    email: str
	})
	    .then(
		(profil) => {
		    if (D.debug) {console.log('Dans profilCtrl.js.getOneProfilByAnyIdCtrl by email profil',profil)};
		    res.status(200).json(profil);
		}
	    ).catch(
		(error) => {
		    if (D.debug) {console.log('Dans profilCtrl.js.getOneProfilByAnyIdCtrl Erreur',error)};
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
		    if (D.debug) {console.log('Dans profilCtrl.js.getOneProfilByAnyIdCtrl by _id profil',profil)};
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
    if (D.debug) {console.log('Entrée dans profilCtrl.js.login avec req.body',req.body)};
    if (D.debug) {console.log('Dans profilCtrl.js.login req.body.email', req.body.email)};

    profilMongooseModel.findOne({ email: req.body.email }).
	then( /* mongoose method */
	    (un_profil) => {
		if (D.debug) {console.log('Dans profilCtrl.js.login un_profil', un_profil)};

		if (!un_profil) {
		    return res.status(401).json({
			error: new Error('Dans profilCtrl.js.login Erreur : Profil inconnu!')
		    });
		}
		if (D.debug) {console.log('Dans profilCtrl.js.login req.body.password', req.body.password)};
		if (D.debug) {console.log('Dans profilCtrl.js.login un_profil.password', un_profil.password)};
		bcrypt.compare(req.body.password, un_profil.password)
		    .then(
			(valid) => {
			    if (D.debug) {console.log('Dans profilCtrl.js.login bcrypt.compare est', valid)};
			    
			    if (!valid) {
				return res.status(401).json({
				    error: new Error('profilCtrl.js.login : le password est incorrect!')
				});
			    }

			    const token = jwt.sign( /* JWT encode new token */
				{ userId: un_profil._id },
				'RANDOM_TOKEN_SECRET',
				{ expiresIn: '7d' });
			    
			    if (D.debug) {console.log('Dans profilCtrl.js.login nouveau token', token)};
			    res.status(200).json({
				userId: un_profil._id,
				token: token
			    });   
			}
		    ).catch(
			(error) => {
			    if (D.debug) {console.log('Dans profilCtrl.js.login Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			}
		    );
	    }
	).catch(
	    (error) => {
		if (D.debug) {console.log('Dans profilCtrl.js.login email inconnu',req.body.email)};
		res.status(500).json({
		    error: error
		});
	    }
	);
};

exports.modifyProfilCtrl = (req, res, next) => {
    if (D.debug) {console.log('Entrée dans profilCtrl.js.modifyProfilCtrl avec req.body ', req.body)};
    if (D.debug) {console.log('Entrée dans profilCtrl.js.modifyProfilCtrl avec req.params.id ', req.params.id)};
    
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
    if (D.debug) {console.log('Entrée dans profilCtrl.js.signup avec req.body',req.body)};

    bcrypt.hash(req.body.password, 10)
	.then(
	    (a_password_hash) => {
		if (D.debug) {console.log('Dans profilCtrl.js.signup a_password_hash', a_password_hash)};
		if (D.debug) {console.log('Dans profilCtrl.js.signup req.body.password', req.body.password)};

		const profil = new profilMongooseModel({
		    pseudo: req.body.pseudo,
		    email: req.body.email,
		    password: a_password_hash
		});

		if (D.debug) {console.log('Dans profilCtrl.js.signup profil', profil)};
		profil.save() /* dans BD */
		    .then(
			() => {
			    res.status(201).json({
				message: 'Profil ajoutée avec succès!'
			    });
			})
		    .catch(
			(error) => {
			    if (D.debug) {console.log('Dans profilCtrl.js.signup a_password_hash', a_password_hash)};
			    if (D.debug) {console.log('Dans profilCtrl.js.signup Erreur', error)};
			    res.status(500).json({
				error: error
			    });
			});
	    }
	)
	.catch(
	    (error) => {
		if (D.debug) {console.log('Dans profilCtrl.js.signup Erreur', error)};
		res.status(550).json({
		    error: error
		});
	    });
};

