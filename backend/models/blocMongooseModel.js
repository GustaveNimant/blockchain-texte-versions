const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blocSchema = new Schema({
    index: { type: Number, required: true },
    typeContenu: { type: String, required: true },
    contenu: { type: String},
    horodatage: { type: String},
    hashPrecedent: { type: String},
    hashCourant: { type: String},
    auteurClePublique: { type: String},
},{
    collection : 'bloc_c'
});

module.exports = mongoose.model('blocMongooseModel', blocSchema);
