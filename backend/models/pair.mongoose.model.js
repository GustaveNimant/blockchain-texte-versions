const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pairSchema = new Schema({
    url: { type: String, required: true },
},{
    collection : 'pair_c'
});

module.exports = mongoose.model('pair.mongoose.model', pairSchema);
