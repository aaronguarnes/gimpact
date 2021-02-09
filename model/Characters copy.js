const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
        name: {type: String},
        description: {type: String},
        itemType: {type: String},
    
});

var Item = mongoose.model('myUser', ItemSchema)
module.exports = Item;