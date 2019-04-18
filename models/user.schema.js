const mongoose = require('mongoose');
const  bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

let userschema = new Schema({
    email : String,
    password : String,
});

userschema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userschema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


let User = mongoose.model('User',userschema);

module.exports = User;