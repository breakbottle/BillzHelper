/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 1:57 PM
 * Description:
 */
mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/billz');
var db = mongoose.connection;
/* This is to fix a warning that is in the console due to incompatible versions of mongodb and Node : v0.12.0
 you can remove this error once you either update new version node, mongodb is fixed or downgrade node.
 the following removes the error
 *Go to the file (in your project):
 'node_modules/mongoose/node_modules/mongodb/node_modules/bson/ext/index.js'
 and change
 bson = require('../build/Release/bson');
 to
 bson = require('bson');*/
db.on('error',console.error.bind(console,'connection error... '));
db.once('open',function callback(){
    console.log("billz connection open");
});

/*
 var messageSchema = mongoose.Schema({message:String});
 var Message = mongoose.model('Message',messageSchema);
 var mongoMessage;
 Message.findOne().exec(function(err,messageDoc){
 mongoMessage = messageDoc.message;
 });*/

module.exports = {connection:db,mongoose:mongoose};