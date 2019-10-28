const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const texteSchema = new Schema({
    contenu: { type: String, required: true },
    auteurClePublique: { type: String, required: true },
},{
    collection : 'texte_c'
});

module.exports = mongoose.model('texte.mongoose.model', texteSchema);
