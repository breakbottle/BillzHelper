/**
 * Author: Clint Small Cain
 * Date: 4/8/2015
 * Time: 9:30 PM
 * Description:
 */
var mysql = require('./mysql');
var orm = require('orm');
var Promise = require('promise');
var fs = require('fs');

var connection  = orm.connect({
    host     : mysql.host,
    user     : mysql.user,
    password : mysql.password,
    database : mysql.database,
    protocol: 'mysql',
    //socketPath: '/var/run/mysqld/mysqld.sock',
    port:     '3306',
    query:    {pool: true, debug: true}
});

var execQueryFile  = function(actionData,action){
    switch(action){
        case 'query':
            return new Promise(function(resolve,reject){
                connection.driver.execQuery(actionData,function(err,data){
                    if(err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
            break;
        default:
            return new Promise(function(resolve,reject){
                fs.readFile(actionData,'utf8',function(err,data){
                    if(err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }

                });
            });
            break;
    }
};
var qfQuery = function(file,callback,fields){
    execQueryFile('./server/db/queries/'+file+'.sql').then(function(data){
        if(fields){
            //is an array
            if(fields.length){
                for(var i=0;i < fields.length;i++){
                    data = data.replace('['+fields[i].key+']',fields[i].value);
                }
            }
        }
        return execQueryFile(data,'query');
    },function(fail){
        callback(fail,null);
    }).then(function(data){
        callback(null,data);
    },function(fail){
        callback(fail,null);
    });
};
module.exports  ={
    connect: connection,
    queryFile: execQueryFile,
    qfQuery:qfQuery
};