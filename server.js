/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 7:33 AM
 * Description:
 */
var express = require('express'),
    stylus = require('stylus'),
    morganLogger = require('morgan'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    crypto = require("crypto"),
    configs = require('./server/includes/configs'),
    route = require('./server/includes/route-manager');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

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

var app = express();

function compile(str,path){
 return stylus(str).set('filename',path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine','jade');
app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret:"the main billz",
    resave: true,
    saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(stylus.middleware(
    {
        src:__dirname+ '/public',
        compile: compile
    }
));
app.use(express.static(__dirname+'/public'));
/*app.use(function(req,res,next){
    console.log("whos is logged in",req.user);
    next();
});
*/
//route.load(configs.controllers);
route.fullRoute(app,"forPartials");

app.post('/logout',function(req, res,next){
    console.log('wer are out');
    req.logout();
    res.end();//redirect from server to logout landing page.
});
app.post('/login',function(req, res,next){

   var auth = passport.authenticate('local',function(err,user){ console.log('madsssssse it here',user);
       if(err) return next(err);
       if(!user){
           res.send({success:false});
       } else {
           req.logIn(user,function(err){
               if(err) return next(err);
               res.send({success:true,user:user});
           })
       }
   });
    auth(req,res,next);
});

app.get('*',route.get);
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('shared/error', {
            message: err.message,
            error: err,
            stack: err.stack
        });
    });
}
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('shared/error', {
        message: 'Something went wrong',
        error: {},
        stack: {}
    });
});
var port = 3030;
app.listen(port);
console.log("Listening on port "+port+'...');