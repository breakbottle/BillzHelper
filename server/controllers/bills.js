/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 2:41 PM
 * Description:
 */
var loggedInMenu = require('../includes/logged-in-menu');
var action = require('../models/controller-action');
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
module.exports =  {
    index:action(index)
};