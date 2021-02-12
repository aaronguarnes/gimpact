const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('../model/User').schema;

const PostSchema = new Schema({
        title: {type: String},
        content: {type: String},
        author: {type: userSchema},
        date: {type: Date}
    
});

var forumPost = mongoose.model('myPost', PostSchema)
module.exports = forumPost;