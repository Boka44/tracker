const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const constants = require('../../utils/constants');

const locationSchema = new Schema({
	createdAt: { type: Date },
	updatedAt: { type: Date },
	name: { type: String },
	tons: { type: String },
	status: { type: String },
	material: { type: String },
    type: { type: String },
    notes: { type: String }
});

locationSchema.pre('save', function (next) {
	let location = this;
	this.type = location.type ? location.type : constants.LOCATION_DOC_TYPE;
	
	this.createdAt = location.createdAt ? location.createdAt : moment().local();
	this.updatedAt = moment().local();

	next();
})

const Locations = mongoose.model('Location', locationSchema);

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