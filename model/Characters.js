const mongoose = require('mongoose')
const Schema = mongoose.Schema

const charSchema = new Schema({
        name: {type: String},
        title: {type: String},
        description: {type: String},
        talents: {type: [String]},
        constellation: {type: String},
        ascension: {type: String}



    
});

var Char = mongoose.model('myChar', charSchema)
module.exports = Char;