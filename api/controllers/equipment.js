const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const Equipment = require('../schemas/equipment');

const equipmentController = () => { };

var Logger = require('logger');
var logger = new Logger.Logger({
    label: "EQUIPMENT CONTROLLER"
});

equipmentController.createEquipment = (req, res, next) => {
    let equipmentObj = req.body;
    
    const newEquipmentObj = new Equipment(equipmentObj);
    newEquipmentObj.save()
        .then((result) => {
            console.log(newEquipmentObj);
            logger.info("Equipment creation successful", req);
            return res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in creating Equipment", err, req)
            next(err)
        })
}

equipmentController.getAllEquipments = (req, res, next) => {
    return Equipment.findAllEquipments()
        .then((result) => {
            logger.info("getAllEquipments successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in getAllEquipment function", err, req)
            next(err);
        })
}

equipmentController.findEquipmentById = (req, res, next) => {
    let id = req.params.id;
    return Equipment.findById(id)
        .then((result) => {
            logger.info("findEquipmentById successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in findEquipmentById function", err, req)
            next(err);
        })
}

equipmentController.edit = (req, res, next) => {
    let equipmentObj = req.body;
    return Equipment.editEquipment(equipmentObj)
        .then((result) => {
            logger.info("Equipment edit successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in edit Equipment function", err, req)
            next(err);
        })
}

equipmentController.delete = (req, res, next) => {
    let id = req.params.id;
    return Equipment.deleteEquipment(id)
        .then((result) => {
            logger.info("Equipment delete successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in delete Equipment function", err, req)
            next(err);
        })
}

module.exports = equipmentController;