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
    authPassport = require('./server/includes/auth').passport,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),

    configs = require('./server/includes/configs'),
    route = require('./server/includes/route-manager')
    applicationConfig = require('./server/includes/app-configs');

if(applicationConfig.environment == 'development'){
    var nomo = require('node-monkey').start();//for client browser debugging
}

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
app.use(authPassport.initialize());
app.use(authPassport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(stylus.middleware(
    {
        src:__dirname+ '/public',
        compile: function(str,path){
            return stylus(str).set('filename',path);
        }
    }
));
app.use(express.static(__dirname+'/public'));
/*app.use(function(req,res,next){
    console.log("whos is logged in",req.user);
    next();
});
*/
route.fullRoute(app,"forPartials");

app.get('*',route.request);
app.post('*',route.request);
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
app.listen(configs.serverPort);
console.log("Listening on port "+configs.serverPort+'...');
module.exports = app;