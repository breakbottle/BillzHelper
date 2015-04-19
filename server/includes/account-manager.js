/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 4:02 PM
 * Description:
 */
var bilUserObject = require('../models/users');
//var bilUser = require('../models/db/biluser');
var db = require('../db/orm2').connect;
var utils = require("./utils");
var eClientErrors = require('../enums/client-error-enums');

var createUser = function(request,callback){
    db.load('../models/db/biluser');
    var userData = request.body;
    userData.salt = utils.createSalt();
    userData.hashPass = utils.hashPassword(userData.salt,userData.userPassword);

    db.models.biluser.exists({userName:userData.userName},function(err,userExists){
        if(!userExists){
            //separate queries so that we can have separate errors.
            db.models.biluser.exists({userEmail:userData.userEmail},function(err,emailExists){
                if(!emailExists){
                    db.models.biluser.create([
                        new bilUserObject(userData.userName,userData.hashPass,userData.salt,userData.userEmail)
                    ],callback);
                }else {
                    callback(eClientErrors.userEmailExistsError,[]);
                }
            });
        }else {
            callback(eClientErrors.userNameExistsError,[]);
        }
     });
};
var deleteUser = function(id,callback){
    db.models.biluser.find({userId:id}).remove(function(error,user){
        callback(error,user);
    });
};
module.exports = {
    createUser:createUser,
    deleteUser:deleteUser
};