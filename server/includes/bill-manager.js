/**
 * Author: Clint Small Cain
 * Date: 4/19/2015
 * Time: 8:59 AM
 * Description:
 */
var qfQuery = require('../db/orm2').qfQuery;
var q = require('q');
var billItem = require('../models/bill-item');

//todo:at a time crunch, complete using queryFile we can go back and use ORM
var updateBill = function(billItem){
    var result = q.defer();
    qfQuery('qf-delete-bill',function(error,data){
        if(data){
            result.resolve(data);
        } else {
            result.reject(error);
        }
    },[
        {
            key:'paid',
            value:billItem.paid
        },{
            key:'itemId',
            value:billItem.itemId
        },{
            key:'creditorId',
            value:billItem.creditorId
        },{
            key:'confirmationCode',
            value:billItem.confirmationCode
        },{
            key:'amountDue',
            value:billItem.amountDue
        }
    ]);
    return result.promise;
};
var processAutoBills = function(){
    var result = q.defer();
    qfQuery('qf-process-auto-bills',function(error,data){
        if(data){console.log("that data---------->",data);
            for(var i = 0; i< data.length; i++){
                var bItm = new billItem(data[i].itemID,data[i].creditorID,"yes",new Date(),null,data[i].min_payments);
                updateBill(bItm).then(function(res){
                    //checks for update went good..YEPER
                    console.log("We just auto process all bills",res)
                });
            }
            result.resolve(data);
        } else {
            result.reject(error);
        }
    });
    return result.promise;
};
var managePayPeriod = function(){
    var result = q.defer();
    qfQuery('qf-payperiod-sync',function(error,data){
        if(data){
            result.resolve(true);
        } else {
            result.reject(error);
        }
    });
    return result.promise;
};
var addBill = function(billItem,interval){
    var addDateInTheFuture = "";
    var dateFormat =  billItem.dueDate.getFullYear()+"-"+(billItem.dueDate.getMonth()+1)+"-"+billItem.dueDate.getDate();//maybe get time ;)
    if(interval){
        addDateInTheFuture = "DATE_ADD( '"+dateFormat+"' , INTERVAL "+interval.frequency+" "+interval.type.toUpperCase()+" )";
    }

    var result = q.defer();
    qfQuery('qf-add-bill',function(error,data){
        if(data){
            result.resolve(data);
        } else {
            result.reject(error);
        }
    },[
        {
            key:'creditorId',
            value:billItem.creditorId
        },{
            key:'amountDue',
            value:billItem.amountDue
        },{
            key:'paid',
            value:billItem.paid
        },{
            key:'dueDate',
            value: (interval)?addDateInTheFuture:"'"+dateFormat+"'"
        }
    ]);
    return result.promise;
};
var deleteBill = function(billId){
    var result = q.defer();
    qfQuery('qf-delete-bill',function(error,data){
        if(data){
            result.resolve(data);
        } else {
            result.reject(error);
        }
    },[
        {
            key:'billId',
            value:billId
        }
    ]);
    return result.promise;
};
var getCreditorsToAutoProcess = function(){
    var result = q.defer();
    qfQuery('qf-get-valid-creditor',function(error,data){
        if(data){
            result.resolve(data);
        } else {
            result.reject(error);
        }
    });
    return result.promise;
};
var autoAddBillsForCreditors = function(){
    processAutoBills();
    managePayPeriod();

    getCreditorsToAutoProcess().then(function(creditors){
        for(var i = 0; i< creditors.length; i++){
            var calcDueDate = (creditors[i].dueDate)?new Date(creditors[i].dueDate):((creditors[i].StartDate)?new Date(creditors[i].StartDate):new Date())

            if(!creditors[i].dueDate){
                creditors[i].interval = 0;
            }
            var bItm = new billItem(0,creditors[i].id,"no","",calcDueDate,creditors[i].min_payments);
            addBill(bItm,{
                frequency:creditors[i].interval,
                type:creditors[i].intervalType
            });
        }
    });

};

module.exports = {
    processAutoBills:processAutoBills,
    managePayPeriod:managePayPeriod,
    addBill:addBill,
    deleteBill:deleteBill,
    updateBill:updateBill,
    getCreditorsToAutoProcess:getCreditorsToAutoProcess,
    autoAddBillsForCreditors:autoAddBillsForCreditors
};