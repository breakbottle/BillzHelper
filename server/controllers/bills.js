/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 2:41 PM
 * Description:
 */
var loggedInMenu = require('../includes/logged-in-menu');
var action = require('../models/controller-action');
var queryFile = require('../db/orm2').queryFile;

var index = function(request,router){//arguments
    var model =  {
        pageTitle:"Bills To Pay ",
        model:{
            heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
            heroTextBottom:"Reminders to pay your bills on time"//this text should be random
        },
        pageMenus:(request.isAuthenticated())?loggedInMenu:[]
    };
    router.View(model);
};

var list = function(request,router){

    queryFile('./server/db/queries/qf-full-list.sql').then(function(data){

        return queryFile(data,'query');
    },function(fail){
        //console.log('Put Error message here',fail);
    }).then(function(data){
        router.response.send({bills:data});
    },function(fail){
        ///console.log('Put Error message here',fail);
    });
};
var listWithKey = function(request,router){
    var itemId = this.controllerActionKey;
    queryFile('./server/db/queries/qf-item.sql').then(function(data){
        data = data.replace('[itemId]',itemId);
        return queryFile(data,'query');
    },function(fail){
        console.log('Put Error message here get file error',fail);
    }).then(function(data){
        router.response.send({billsInformation:data});
    },function(fail){
        console.log('Put Error message here, query errror',fail);
    });


};
module.exports =  {
    index:action(index),
    list:action({},true,false).post(list),
    listWithKey:action({},true,false).post(listWithKey)

};