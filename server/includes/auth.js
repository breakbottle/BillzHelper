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
        db.load('../models/db/biluser');
        db.models.biluser.find({
            userName:user
        }).only("userId","userPassword","userSalt").run(function(err,dbUser){
            console.log("Select Email Error:",err);
            console.log("user with that email",dbUser);
            //console.log('the hash',hash,dbUser.length);
            if(dbUser.length >= 1){
                var person = dbUser[0];
                hash = utils.hashPassword(person.userSalt,pass);
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
   done(null,user);
   /*we stored the full user object we got login
    instead of just the Id,therefore we don't have to lookup.
    Only lookup when it come to authorization. and that won't be done here.
     */

});

module.exports = {
    passport:passport
};
