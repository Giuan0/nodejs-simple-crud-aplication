const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
	name    : {type : String , required : true},
	email   : {type: String, unique: true, required : true},
	password: String,
    phone   : {type : String},
	type: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client'
    },
	registrationDate : {type: Date, required : true},
	lastLogin: Date,
	address: String
});

module.exports = mongoose.model('User' , schema);
