/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 12:30 PM
 * Description:
 */
var menuItem = require('../models/menu-item');
var action = require('../models/controller-action');
var serverAuth = require('../includes/auth');
var bilUserObject = require('../models/users');
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
    var createdUser = serverAuth.createUser(request,function(error,user){
        if(!error){
        var bilUser = new bilUserObject(user[0].userName);
        bilUser.userId = user[0].id;
        bilUser.userEmail = user[0].userEmail;

        console.log("whatis the new user",bilUser);

        request.logIn(bilUser,function(error){
            if(error) return router.next(error);
        });
        router.JSON(bilUser);
        } else {
            var clientError;
            switch(error){
                case 1:
                    clientError = "Please choose another username";
                    break;
                case 2:
                    clientError = "Please choose another email";
                    break;
                default:
                    clientError = "There was an error while creating account.";
                    break;
            }
            console.log("Error: ",clientError);
            router.SendError(500,{reason:clientError});//todo: add config debug..if debug send actual error
        }
    });
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
        console.log('you sent ---------------------->>>>>',user,err)
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