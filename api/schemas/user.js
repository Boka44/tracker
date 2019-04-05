const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');
const moment = require('moment');
const uuid = require('uuid/v1');
const constants = require('../../utils/constants');


const userSchema = new Schema({
	createdAt: { type: Date },
	updatedAt: { type: Date },
	name: { type: String },
	email: { type: String },
	hashedPassword: { type: String },
	salt: { type: String },
	status: { type: String },
	// owner: { type: String },
	isDeleted: { type: Boolean, default: false },
	role: { type: String },
    type: { type: String },
	notes: { type: String },
	equipment: { type: String },
	location: { type: String }
});

userSchema.pre('save', function (next) {
	let user = this;
	this.type = user.type ? user.type : constants.USER_DOC_TYPE;
    this.name = user.name.replace(/\s+/g, ' ').trim();
	this.email = user.email.toLowerCase().trim();
	
	this.createdAt = user.createdAt ? user.createdAt : moment().local();
	this.updatedAt = moment().local();

	this.isDeleted = user.isDeleted ? user.isDeleted : false;
   
	next();
})

const Users = mongoose.model('User', userSchema);

// Users.createUser = (user) => {
// 	const newUser = new Users(user);
// 	let promise = newUser.save(); 
// 	promise.then((result) => {
// 		return result;
// 	})
// }

Users.deleteUser = (id) => {
	return new Promise((resolve, reject) => {
		Users.deleteOne({ _id: id})
		.exec((err, result) => {
			if(err) reject(err);
			resolve(true);
		})
	})
}

Users.findAllUsers = () => {
	return new Promise((resolve, reject) => {
		Users.find({})
		.exec((err, result) => {
			if(err) reject(err);
			 resolve(result);
		})
	})
}

Users.findOneById = (id) => {
	return new Promise((resolve, reject) => {
		Users.findById(id)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

Users.editUser = (user) => {
	return new Promise((resolve, reject) => {
		Users.findOneAndUpdate({_id: user._id}, user)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result);
		})
	})
}

Users.FindOneByEmail = (email) => {
	return new Promise((resolve, reject) => {
		Users.findOne({ email: email.toLowerCase().trim()})
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result);
		})
	})
}

function generateRandomString() {
    return uuid();
}

Users.salt = () => {
	return generateRandomString();
}

Users.encryptPassword = function (password, saltString) {
    if (!password || !saltString) {
        return '';

	}
    const passwordBuffer = Buffer.from(password, 'utf-8');
    const salt = Buffer.from(saltString, 'utf-8');
    return crypto.pbkdf2Sync(passwordBuffer, salt, 10000, 64, 'sha512').toString('base64');
};



module.exports = Users;