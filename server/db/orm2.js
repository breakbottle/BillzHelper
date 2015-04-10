/**
 * Author: Clint Small Cain
 * Date: 4/8/2015
 * Time: 9:30 PM
 * Description:
 */
var mysql = require('./mysql');
var orm = require('orm');
module.exports  = orm.connect({
    host     : mysql.host,
    user     : mysql.user,
    password : mysql.password,
    database : mysql.database,
    protocol: 'mysql',
    //socketPath: '/var/run/mysqld/mysqld.sock',
    port:     '3306',
    query:    {pool: true, debug: true}
},function(err,db) {
    if (err) throw err;
});