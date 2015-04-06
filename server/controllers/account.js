/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 12:30 PM
 * Description:
 */
var menuItem = require('../models/menu-item');
var action = require('../models/controller-action');
var serverAuth = require('../includes/auth');
var index = function(request,router){//arguments
    var model =  {
        pageTitle:"Welcome to "+router.globals.siteName,
        model:{
            heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
            heroTextBottom:"Reminders to pay your bills on time"//this text should be random
        },
        pageMenus: [new menuItem("shante","/clint"),new menuItem("Clint","/clint")]
    };
    router.View(model);
};
var signupPOST = function(request,router){
    var created = serverAuth.createUser(request);
    if(created){//create.valid bool
        var usr  = {id:1,Name:"Clint LoggedIn"};


        request.logIn(usr,function(error){
            if(error) return router.next(error);
        });
        router.JSON(usr);
    } else {
        router.SendError(500,{reason:"Error creating user"});
    }

};
var signup = function(request,router){//arguments
    var model =  {
        pageTitle:"Sign Up - Create an account",
        model:{
            heroTextTop:"A tool that helps you keep track of your bills.",//this text should be random
            heroTextBottom:"Reminders to pay your bills on time"//this text should be random
        },
        pageMenus: []
    };
    router.View(model);
};

var login = function(request,router){
    var auth = serverAuth.passport.authenticate('local',function(err,user){
        if(err) return router.next(err);
        if(!user){
            router.response.send({success:false});
        } else {
            request.logIn(user,function(err){
                if(err) return router.next(err);
                router.response.send({success:true,user:user});
            })
        }
    });
    auth(request,router.response,router.next);
};
var logout = function(request,router){
    request.logout();
    router.response.end();//redirect from server to logout landing page.
};
module.exports =  {
    index:action(index),
    signup:action(signup,true).post(signupPOST),
    login:action(login,true).post(login),
    logout:action(logout,true).post(logout)
};