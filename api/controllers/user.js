const Promise = require('bluebird');
const moment = require('moment');
const _ = require('lodash');

const User = require('../schemas/user');

const userController = () => { };

var Logger = require('logger');
var logger = new Logger.Logger({
    label: "USER CONTROLLER"
});

userController.createUser = (req, res, next) => {
    let userObj = req.body;
    // User.FindOneByEmail(userObj.email)
        // .then((result) => {
        //     if(result) {
        //         console.log(result);
        //         const err = new Error("User with email address already exists");
        //         logger.error("Error in creatUser function", err, req)
        //         return next(err)
        //     }
            userObj.salt = User.salt();
            userObj.hashedPassword = User.encryptPassword(req.body.password, userObj.salt);
            delete userObj.password;
            const newUserObj = new User(userObj);
            newUserObj.save()
                .then((result) => {
                    console.log(newUserObj);
                    logger.info("User creation successful", req);
                    return res.status(200).send({
                        success: true
                    })
                })
                .catch((err) => {
                    logger.error("Error in creating user", err, req)
                    next(err)
                })
        // })
}

userController.getAllUsers = (req, res, next) => {
    return User.findAllUsers()
        .then((result) => {
            logger.info("getAllUsers successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in getAllUser function", err, req)
            next(err);
        })
}

userController.findUserById = (req, res, next) => {
    let id = req.params.id;
    return User.findById(id)
        .then((result) => {
            logger.info("findUserById successful", req);
            res.status(200).send({
                success: true,
                data: result
            })
        })
        .catch((err) => {
            logger.error("Error in findUserById function", err, req)
            next(err);
        })
}

userController.edit = (req, res, next) => {
    let userObj = req.body;
    return User.editUser(userObj)
        .then((result) => {
            logger.info("User edit successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in edit user function", err, req)
            next(err);
        })
}

userController.delete = (req, res, next) => {
    let id = req.params.id;
    return User.deleteUser(id)
        .then((result) => {
            logger.info("User delete successful", req);
            res.status(200).send({
                success: true
            })
        })
        .catch((err) => {
            logger.error("Error in delete user function", err, req)
            next(err);
        })
}

module.exports = userController;