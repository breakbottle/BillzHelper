/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:02 PM
 * Description:
 */
var menuItem = require('../models/menu-item');
console.log('LOADED HOME....................');
var index = function(globals,request){//arguments
   return  {
       pageTitle:"Welcome to "+globals.siteName,
            model:{
                heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
                heroTextBottom:"Reminders to pay your bills on time"//this text should be random
            },
            pageMenus: [new menuItem("shante","/clint"),new menuItem("Clint","/clint")]
        };

};
var signup = function(globals,request){//arguments
    return  {
        pageTitle:"Sign Up - Create an account",
        model:{
            heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
            heroTextBottom:"Reminders to pay your bills on time"//this text should be random
        },
        pageMenus: []
    };

};


module.exports =  {
    index:index,
    signup:signup
};