/**
 * Author: Clint Small Cain
 * Date: 3/31/2015
 * Time: 11:44 PM
 * Description:
 */
var passport = require('passport'),
    crypto = require("crypto"),
    localStrategy = require('passport-local').Strategy;

var createSalt = function(){
    return crypto.randomBytes(128).toString('base64');
};
var hashPassword = function(salt,pwd){
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');

};
passport.use(new localStrategy(
    function(user,pass,done){
        //here we connect to mysql

        var salt,hash,superadmin;
        salt = createSalt();
        hash = hashPassword(salt,pass);
        superadmin = hashPassword(salt,"clint");
        console.log("this pass ",pass, " for this hash ",hash);

        if(superadmin == hash){//check for user pass
            return done(null,{id:1,Name:"Clint LoggedIn"});
        } else{
            return done(null,false);
        }

    }
));
passport.serializeUser(function(user,done){
    if(user){
        done(null,user.id);
    }
});
passport.deserializeUser(function(id,done){
    //lookup user in db
    done(null,{id:1,Name:"Clint LoggedIn"});//add condition if can't find user rturn done(null,false);
});

module.exports = passport;
