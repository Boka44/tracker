const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const constants = require('../../utils/constants');

const equipmentSchema = new Schema({
	createdAt: { type: Date },
	updatedAt: { type: Date },
	name: { type: String },
	mileage: { type: String },
	engineHours: { type: String },
	location: { type: String },
	miner: { type: String },
	type: { type: String },
	status: { type: String },
    notes: { type: String }
});

equipmentSchema.pre('save', function (next) {
	let equipment = this;
	this.type = equipment.type ? equipment.type : constants.EQUIPMENT_DOC_TYPE;
	
	this.createdAt = equipment.createdAt ? equipment.createdAt : moment().local();
	this.updatedAt = moment().local();
   
	next();
})

const Equipments = mongoose.model('Equipment', equipmentSchema);

Equipments.deleteEquipment = (id) => {
	return new Promise((resolve, reject) => {
		Equipments.deleteOne({ _id: id})
		.exec((err, result) => {
			if(err) reject(err);
			resolve(true);
		})
	})
}

Equipments.findAllEquipments = () => {
	return new Promise((resolve, reject) => {
		Equipments.find({type: constants.EQUIPMENT_DOC_TYPE})
		.exec((err, result) => {
			if(err) reject(err);
			 resolve(result);
		})
	})
}

Equipments.findOneById = (id) => {
	return new Promise((resolve, reject) => {
		Equipments.findById(id)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result)
		})
	})
}

Equipments.editEquipment = (equipment) => {
	return new Promise((resolve, reject) => {
		Equipments.findOneAndUpdate({_id: equipment._id}, equipment)
		.exec((err, result) => {
			if(err) reject(err);
			resolve(result);
		})
	})
}

module.exports = Equipments;