/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:32 PM
 * Description:
 */
var controllerPath = "../controllers/";
var extend = require('util')._extend;
var mongodb = require('../db/mongo');
var routeItem = require('../models/route-item');

var autoLoadControllers = function(controller){
    //the controller are/should not return any values. since the result is handled by jade
   return require(controllerPath+controller);

};
var sitename = 'BillzHelper';
var version = 'v5.1.0';
var configs = {
    serverPort:3030,
    siteVersion:version,
    clientSideLogging:true,
    siteName:sitename,
    defaultController:"home",
    defaultControllerView:"index",
    globals:{
        //mongodb:mongodb
    },
    clientGlobals:{
        currentYear: new Date().getFullYear(),
        siteName:sitename,
        siteVersion:version
    },
    controllers:[
        new routeItem("home",["/"]),
        new routeItem("account",["/acct"]),
        new routeItem("bills",["/bills"])
    ],
    inController:function(route){
        for(var i =0; i < configs.controllers.length;i++){
            if(route == configs.controllers[i].route){
                return i;
            }
        }
        return null;
    },
    autoLoadControllers:autoLoadControllers

};

module.exports = configs;