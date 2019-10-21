const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blocSchema = new Schema({
    index: { type: Number, required: true },
    typeContenu: { type: String, required: true },
    contenu: { type: String, required: true },
    horodatage: { type: String, required: true },
    hashPrecedent: { type: String, required: true },
    hashCourant: { type: String, required: true },
    auteurClePublique: { type: String, required: true },
},{
    collection : 'bloc_c'
});

module.exports = mongoose.model('blocMongooseModel', blocSchema);
