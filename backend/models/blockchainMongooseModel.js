const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blocMongooseModel = require('./blocMongooseModel');

const blocSchema = new Schema({
    index: { type: Number, required: true },
    typeContenu: { type: String, required: true },
    contenu: { type: String},
    horodatage: { type: String},
    hashPrecedent: { type: String},
    hashCourant: { type: String},
    clePublique: { type: String},
},{
    collection : 'bloc_c'
});

const blockchainSchema = new Schema({
    blocs : [blocSchema]
},{
    collection : 'blockchain_c'
});

module.exports = mongoose.model('blockchainMongooseModel', blockchainSchema);
