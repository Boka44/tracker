const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const Location = require('../schemas/location');

const locationController = () => { };

var Logger = require('logger');
var logger = new Logger.Logger({
    label: "LOCATION CONTROLLER"
});

locationController.createLocation = (req, res, next) => {
    let locationObj = req.body;
    
    const newLocationObj = new Location(locationObj);
    newLocationObj.save()
        .then((result) => {
            console.log(newLocationObj);
            logger.info("Location creation successful", req);
            return res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in creating Location", err, req)
            next(err)
        })
}

locationController.getAllLocations = (req, res, next) => {
    return Location.findAllLocations()
        .then((result) => {
            logger.info("getAllLocations successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in getAllLocation function", err, req)
            next(err);
        })
}

locationController.findLocationById = (req, res, next) => {
    let id = req.params.id;
    return Location.findById(id)
        .then((result) => {
            logger.info("findLocationById successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in findLocationById function", err, req)
            next(err);
        })
}

locationController.edit = (req, res, next) => {
    let locationObj = req.body;
    return Location.editLocation(locationObj)
        .then((result) => {
            logger.info("Location edit successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in edit Location function", err, req)
            next(err);
        })
}

locationController.delete = (req, res, next) => {
    let id = req.params.id;
    return Location.deleteLocation(id)
        .then((result) => {
            logger.info("Location delete successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in delete Location function", err, req)
            next(err);
        })
}

module.exports = locationController;