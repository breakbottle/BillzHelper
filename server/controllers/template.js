/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:02 PM
 * Description:
 */
var menuItem = require('../models/menu-item');

module.exports =  function(globals,request){//arguments
    /* var query = "SELECT min_payments,id,`interval`,`intervalType`,`StartDate`,`EndDate`,`billtype`, (select max(due_date) from billmgr where creditor=bc.id) dueDate FROM bill_creditors bc where active  = 1 and ((id not in (select creditor from billmgr where paid='no' and due_date > now()) and id in (select creditor from billmgr where paid='no' and due_date < now())) or id not in (select creditor from billmgr ) or (select count(*) from billmgr where paid='no' and creditor=bc.id) =0 ) and `interval` > 0 and min_payments > 0 and billtype=1";
    globals.mysql.connect();
    var result;
    globals.mysql.query(query, function(err, rows, fields) {
        if (err) throw err;
        //console.log('The solution is: ', rows);
    });


    var messageSchema = globals.mongodb.mongoose.Schema({message:String});
    var Message = globals.mongodb.mongoose.model('Message',messageSchema);
    var mongoMessage;
    Message.findOne().exec(function(err,messageDoc){
        mongoMessage = messageDoc.message;
        console.log("what is ",messageDoc);
    });*/
    console.log("This is home controller with access to globals",request.user);
    var init = function(){
        console.log("here it is argu",arguments);
    };


    var returns =  {page:"my page name",
            model:" data from the index controller server side",
            pageMenus: [new menuItem("shante","/clint"),new menuItem("Clint","/clint")]
        };
    console.log("what is returned",returns);

    //globals.mysql.end();
    return returns;

};