const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scientificPapersSchema = new Schema({
    title: String,
    abstract: String,
    subject: Array,
    link: { type: String, unique: true },
})

module.exports = mongoose.model('scientificPapers', scientificPapersSchema);