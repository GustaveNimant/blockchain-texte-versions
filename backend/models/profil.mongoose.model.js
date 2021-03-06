const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
    
const profilSchema = new Schema({
    pseudo: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    auteurClePublique: { type: String, required: true, unique: true },
},{
    collection : 'profil_c'			    
});

profilSchema.plugin(uniqueValidator);

module.exports = mongoose.model('profil.mongoose.model', profilSchema);
