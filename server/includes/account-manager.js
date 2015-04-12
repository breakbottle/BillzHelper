/**
 * Author: Clint Small Cain
 * Date: 4/11/2015
 * Time: 4:02 PM
 * Description:
 */
var bilUserObject = require('../models/users');
var db = require('../db/orm2');
var utils = require("./utils");
var eClientErrors = require('../enums/client-error-enums');

var User = db.define("biluser",{
    userName         : String,
    userPassword     : String,
    userSalt         : String,
    userEmail        : String,
    userId          : Number
});
var createUser = function(request,callback){
    //console.log("what is request",request.body)
    var userData = request.body;
    userData.salt = utils.createSalt();
    userData.hashPass = utils.hashPassword(userData.salt,userData.userPassword);

    //"mysql://"+mysql.user+":"+mysql.password+"@"+mysql.host+"/"+mysql.database

    //todo: need to figure out this orm thing. it's putting a default id in my query...want to figure out but will get to it further down building the application.
    //todo: for now I'll just run an inline query
    /*User.find({userName:'test'},'userId',function(err,item){
     console.log("error",err)
     console.log("item",item)
     });*/
    var result = db.driver.execQuery("select userId from biluser where userName= '"+userData.userName+"' limit 1",function(err,user){
        console.log("Select User Error:",err);
        console.log("Users with that name",user);
        if(user.length == 0){
            db.driver.execQuery("select userId from biluser where userEmail= '"+userData.userEmail+"' limit 1",function(err,email){
                console.log("Select Email Error:",err);
                console.log("user with that email",email);
                if(email.length == 0){
                    User.create([
                        new bilUserObject(userData.userName,userData.hashPass,userData.salt,userData.userEmail)
                    ],callback);

                } else {
                    callback(eClientErrors.userEmailExistsError,[]);
                }
            });
        } else {
            callback(eClientErrors.userNameExistsError,[]);
        }

    });

};
var deleteUser = function(id,callback){
    db.driver.execQuery("delete from biluser where userId = '"+id+"'",function(error,user){
        callback(error,user);
    });

};
module.exports = {
    createUser:createUser,
    deleteUser:deleteUser
};