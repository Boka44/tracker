const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const constants = require('../../utils/constants');


const logSchema = new Schema({
    createdAt: { type: Date },
    loggedObj: {
        preUpdate: {},
        postUpdate: {}
    },
    logType: { type: String },
    type: { type: String },
    message: { type: String },
    logSubject: { type: String }
});

logSchema.pre('save', function (next) {
    let log = this;

    this.logType = log.logType ? log.logType : 'update';
    this.type = log.type ? log.type : constants.LOG_DOC_TYPE;
    this.createdAt = moment().local().format();
    if(this.logType === 'safety' || this.logType === 'hazard' || this.logType === 'shift') {
        //    default missing values other than notes and metadata
        this.loggedObj = {};
        this.logSubject = '';
        // this.message = moment(this.createdAt).format('MM/DD/YYYY h:mm:ss a') + ": " +this.logType.toUpperCase() + " NOTE: " + log.message;
    } 
    if(this.logType === 'update') {
        if(this.loggedObj.preUpdate.type === constants.USER_DOC_TYPE) {
            
            this.logSubject = 'MINER';
        }
        if(this.loggedObj.preUpdate.type === constants.EQUIPMENT_DOC_TYPE) {
            
            this.logSubject = 'EQUIPMENT';
        }

        if(this.loggedObj.preUpdate.type === constants.LOCATION_DOC_TYPE) {
            
            this.logSubject = 'LOCATION';
        }
        this.message = this.loggedObj.postUpdate.name + " changed from " +
        this.loggedObj.preUpdate.status + " to " + this.loggedObj.postUpdate.status;
    }
	next();
})

const Logs = mongoose.model('Log', logSchema);

// Logs.createLog = (log) => {
//     const newLog = new Logs(log);
//     let promise = newLog.save();
//     promise.then((result) => {
//         return result;
//     })
// }

Logs.getLogsWithPagination = (page) => {
    return new Promise((resolve, reject) => {
        let LIMITER = page * 20;
        Logs.find({})
        .sort({'createdAt': -1})
        .skip(LIMITER)
        .limit(LIMITER)
        .exec((err, result) => {
            if(err) reject(err);
            resolve(result);
        }) 
    })
}


module.exports = Logs;