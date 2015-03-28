/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:02 PM
 * Description:
 */

module.exports =  function(globals){//arguments
   /* globals.mysql.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;

        console.log('The solution is: ', rows[0].solution);
    });*/
/*
    var messageSchema = globals.mongodb.mongoose.Schema({message:String});
    var Message = globals.mongodb.mongoose.model('Message',messageSchema);
    var mongoMessage;
    Message.findOne().exec(function(err,messageDoc){
        mongoMessage = messageDoc.message;
        console.log("what is ",messageDoc);
    });*/
    console.log("i padded the data for this page");
    var init = function(){
        console.log("here it is argu",arguments);
    };
    return {page:"my page name",
        model:" data from the index controller"};
};