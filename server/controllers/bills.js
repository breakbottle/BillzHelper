/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 2:41 PM
 * Description:
 */
var loggedInMenu = require('../includes/logged-in-menu');
var action = require('../models/controller-action');
var billManager = require('../includes/bill-manager');
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
    //todo:add logic to bill manager
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
var listWithKey = function(request,router){//todo:add logic to bill manager
    var itemId = this.controllerActionKey;
    if(request.body.amountPaid){
        queryFile('./server/db/queries/qf-update-item.sql').then(function(data){
            data = data.replace('[itemId]',itemId);
            data = data.replace('[amountPaid]',request.body.amountPaid);
            data = data.replace('[confirmation]',(request.body.confirmation?request.body.confirmation:''));
            billManager.autoAddBillsForCreditors();//todo: put in then after refactor
            return queryFile(data,'query');
        },function(fail){
            console.log('getting file to update bill failed',fail);
        }).then(function(data){
            if(data){
               //once query passed  -  router.response.send({success:true});
               return queryFile('./server/db/queries/qf-update-creditor.sql').then(function(fdata){
                   fdata = fdata.replace('[creditorId]',request.body.creditorId);
                   fdata =fdata.replace('[adjustBalance]',request.body.adjustBalance);
                   return queryFile(fdata,'query');
               })
            }

        },function(fail){
            console.log('query to update bill failed',fail);
        }).then(function(success){
            if(success){
                router.response.send({success:true});
            }
        });

    } else {
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
    }



};
module.exports =  {
    index:action(index),
    list:action({},true,false).post(list),
    listWithKey:action({},true,false).post(listWithKey)

};