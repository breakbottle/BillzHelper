/**
 * Author: Clint Small Cain
 * Date: 3/31/2015
 * Time: 11:44 PM
 * Description:
 */
    var userModel = require('../models/user-viewModel');
    var bilUserObject = require('../models/users');
    var db = require('../db/orm2'),
        passport = require('passport'),
    utils = require("./utils"),
    localStrategy = require('passport-local').Strategy;


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



passport.serializeUser(function(user,done){
    if(user){
        done(null,user);
    }
});
passport.deserializeUser(function(user,done){
    //lookup user in db

    /*User.get(id,function(err,person){
        var bilUser = new bilUserObject(person.userName);
        bilUser.userId = id;
        done(null,bilUser);
    });*/

    done(null,user);//we stored the full user instead of just the Id,therefore we don't have to lookup. Only lookup when it come to authorization. and that won't be done here.
    /*
    db.driver.execQuery("select userId,userName from biluser where userId= '"+id+"' limit 1",function(err,person){
        var bilUser = new bilUserObject(person[0].userName);
        bilUser.userId = id;
        done(null,bilUser);
        //db.close();
    });*/
   //todo cache this so we're not calling everytime...too many calls to db
});

module.exports = {
    passport:passport
};
