const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    isAdmin: {type: Boolean} 
});

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(8);
        const hashed = await bcrypt.hash(this.password, salt);
        this.password = hashed;
        next();
    } catch(error){
        next(error);
    }
})

var User = mongoose.model('myUser', userSchema)
module.exports = User;