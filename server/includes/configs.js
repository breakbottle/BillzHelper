/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:32 PM
 * Description:
 */
var controllerPath = "../controllers/";
var extend = require('util')._extend;
var mysql = require('../db/mysql');
var mongodb = require('../db/mongo');

console.log("In th housed");
var autoLoadControllers = function(controller){
    //the controller are/should not return any values. since the result is handled by jade
   return require(controllerPath+controller);

};

var configs = {
    siteVersion:'v01.23',
    siteName:'BillzHelper',
    globals:{
        mysql:mysql,
        mongodb:mongodb
    },
    controllers:[
        {
            route:'/',
            name:"home",
            viewModel:{}//page variables
        }],
    inController:function(route){
        for(var i =0; i < configs.controllers.length;i++){
            if(route == configs.controllers[i].route){
                return i;
            }
        }
        return null;
    },
    autoLoadControllers:
    {
        method:autoLoadControllers,
        load:function(){
            for(var i =0; i < configs.controllers.length;i++){
               var instance = this.method(configs.controllers[i].name);
                configs.controllers[i].viewModel = extend(configs.controllers[i].viewModel,instance(configs.globals));
            }
        }
    }
};

module.exports = configs;