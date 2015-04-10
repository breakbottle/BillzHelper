/**
 * Author: Clint Small Cain
 * Date: 3/31/2015
 * Time: 11:44 PM
 * Description:
 */
    var userModel = require('../models/user-viewModel');
    var bilUserObject = require('../models/users');
    var db = require('../db/orm2');

var passport = require('passport'),
    utils = require("./utils"),
    localStrategy = require('passport-local').Strategy;

var User = db.define("biluser",{
    userName         : String,
    userPassword     : String,
    userSalt         : String,
    userEmail        : String,
    userId          : Number
});
passport.use(new localStrategy(
    function(user,pass,done){
        var hash;
        var anything  = db.driver.execQuery("select userId,userPassword,userSalt from biluser " +
            "where userName= '"+user+"'",
            function(err,dbUser){
                console.log("Select Email Error:",err);
                console.log("user with that email",dbUser);
                var person = dbUser[0];
                hash = utils.hashPassword(person.userSalt,pass);
                console.log('the hash',hash,dbUser.length);
                if(dbUser.length >= 1){
                    if(person.userPassword == hash){
                        var bilUser = new bilUserObject(user);
                        bilUser.userId = person.userId;
                        return done(null,bilUser);
                    }  else {
                        return done(null,false);
                    }
                } else {
                    return done(null,false);
                }
        });

    }
));

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
    var result = db.driver.execQuery("select userId from biluser where userName= '"+userData.userName+"'",function(err,user){
        console.log("Select User Error:",err);
        console.log("Users with that name",user);
        if(user.length == 0){
            db.driver.execQuery("select userId from biluser where userEmail= '"+userData.userEmail+"'",function(err,email){
                console.log("Select Email Error:",err);
                console.log("user with that email",email);
                if(email.length == 0){
                    User.create([
                        new bilUserObject(userData.userName,userData.hashPass,userData.salt,userData.userEmail)
                    ],callback);
                } else {
                    callback(2,[]);
                }
            });
        } else {
            callback(1,[]);
        }

    });
};

passport.serializeUser(function(user,done){
    if(user){
        done(null,user.userId);
    }
});
passport.deserializeUser(function(id,done){
    //lookup user in db

    /*User.get(id,function(err,person){
        var bilUser = new bilUserObject(person.userName);
        bilUser.userId = id;
        done(null,bilUser);
    });*/
    db.driver.execQuery("select userId,userName from biluser where userId= '"+id+"'",function(err,person){
        var bilUser = new bilUserObject(person[0].userName);
        bilUser.userId = id;
        done(null,bilUser);
    });
   //todo cache this so we're not calling everytime...too many calls to db
});

module.exports = {
    passport:passport,
    createUser:createUser
};
