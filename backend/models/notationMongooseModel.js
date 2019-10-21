const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const notationSchema = new Schema({
    texteObjectId: { type: String, required: true},
    auteurClePublique: { type: String, required: true},
    date: { type: String, required: true}, /* créée par Service */
    note: { type: Number},
},{
    collection : 'notation_c'			    
});

module.exports = mongoose.model('notationMongooseModel', notationSchema);
