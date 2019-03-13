const router = require('express').Router();
var path = require('path');

const v1 = require('./v1');

module.exports = (app) => {
    app.use('/api', v1);
};
