const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');


const locationSchema = new Schema({
	createdAt: { type: Date },
	updatedAt: { type: Date },
	location: { type: String },
	locationName: { type: String },
	status: { type: String },
	owner: { type: String },
    type: { type: String },
    notes: { type: String }
});

const Locations = mongoose.model('Location', locationSchema);

locationSchema.pre('save', function (next) {
	let user = this;
	this.type = user.type ? user.type : constants.LOCATION_DOC_TYPE;
	
	this.createdAt = user.createdAt ? user.createdAt : moment().local();
	this.updatedAt = moment().local();

	next();
})

Locations.deleteLocation = (id) => {
	return new Promise((resolve, reject) => {
		Locations.deleteOne({ _id: id})
		.exec((err, result) => {
			if(err) reject(err);
			resolve(true);
		})
	})
}

Locations.findAllLocations = () => {
	return new Promise((resolve, reject) => {
		Locations.find({type: constants.LOCATION_DOC_TYPE})
		.exec((err, result) => {
			if(err) reject(err);
			 resolve(result);
		})
	})
}

Locations.findOneById = (id) => {
	return new Promise((resolve, reject) => {
		Locations.findById(id)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

Locations.editLocation = (location) => {
	return new Promise((resolve, reject) => {
		Locations.findOneAndUpdate({_id: location._id}, location)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result);
		})
	})
}

module.exports = Locations;