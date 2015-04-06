/**
 * Author: Clint Small Cain
 * Date: 3/31/2015
 * Time: 11:44 PM
 * Description:
 */
    var userModel = require('../models/user-viewModel');
    var bilUserObject = require('../models/users');

var passport = require('passport'),
    utils = require("./utils"),
    localStrategy = require('passport-local').Strategy;


passport.use(new localStrategy(
    function(user,pass,done){
        //here we connect to mysql

        var salt,hash,superadmin;
        salt = utils.createSalt();
        hash = utils.hashPassword(salt,pass);
        superadmin = utils.hashPassword(salt,"clint");

        console.log("this pass ",pass, " for this hash ",hash);

        var bilUser = new bilUserObject("Keilah");
        bilUser.userId = 1;
        console.log("what going on",bilUser);
        if(superadmin == hash){//check for user pass
            return done(null,bilUser);
        } else{
            return done(null,false);
        }

    }
));
var createUser = function(request,done){
    console.log("what is request",request.body)
    var userData = request.body;
    userData.salt = utils.createSalt();
    userData.salt = utils.hashPassword(userData.salt,userData.userPassword);
    //request.status(400);
    //request.send({reason:"no good"});
    /*var bilUser = new bilUserObject("Keilah");
    bilUser.userId = 1;*/
    console.log("user is created",userData);
return true;//testing...
    //request.status(400)if fail
    //auto login-- request.logIn(
    //return done(null,userData);
};

passport.serializeUser(function(user,done){
    if(user){
        done(null,user.userId);
    }
});
passport.deserializeUser(function(id,done){
    //lookup user in db
    var bilUser = new bilUserObject("Keilah");
    bilUser.userId = 1;
    done(null,bilUser);//add condition if can't find user rturn done(null,false);
});

module.exports = {
    passport:passport,
    createUser:createUser
};
