const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const Log = require('../schemas/log');

const logController = () => { };

var Logger = require('logger');
var logger = new Logger.Logger({
    label: "LOG CONTROLLER"
});

logController.createLog = (req, res, next) => {
    const newLog = new Log(req.body);
    newLog.save()
        .then((result) => {
            logger.info("Log creation successful", req);
            return res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in creating log", err, req)
            next(err)
        })
}

logController.getLogs = (req, res, next) => {
    let page = req.params.page;
    return Log.getLogsWithPagination(page)
        .then((result) => {
            logger.info("Get logs successful", req);
            return res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in getting logs", err, req)
            next(err)
        })
}

module.exports = logController;