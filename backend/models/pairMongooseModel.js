const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pairSchema = new Schema({
    pairObjectId: { type: String, required: true },
    pairUrl: { type: String, required: true },
},{
    collection : 'pair_c'
});

module.exports = mongoose.model('pairMongooseModel', pairSchema);
