/**
 * Author: Clint Small Cain
 * Date: 3/22/2015
 * Time: 2:02 PM
 * Description:
 */
var menuItem = require('../models/menu-item');

module.exports =  function(globals,request){//arguments

    var returns =  {
            page:"Welcome to "+globals.siteName(),
            model:{
                heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
                heroTextBottom:"Reminders to pay your bills on time"//this text should be random
            },
            pageMenus: [new menuItem("shante","/clint"),new menuItem("Clint","/clint")]
        };


    return returns;

};