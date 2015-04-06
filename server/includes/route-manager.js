/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 5:08 PM
 * Description:
 */
var configs = require('./configs');
var routeVars = require('../models/route-vars');
var extend = require('util')._extend;
var routeManager = function(){
    var routerManager = this;
    routerManager.displayError =  'The page your are looking for cannot be found.';
    routerManager.routeVars = function (request) {
        var vars = new routeVars();
        var getActions = request._parsedOriginalUrl.pathname.split("/");
        vars.controller = getActions[1] || configs.defaultController;
        vars.controllerAction = getActions[2] || "";
        for (var i = 0; i < configs.controllers.length; i++) {
            //only load request name
            if (vars.controller == configs.controllers[i].name) {
                vars.instance = configs.autoLoadControllers(configs.controllers[i].name);
                vars.index = i;
            }
        }
        return vars;
    };
    routerManager.requestFilter = function(req,actionObject,actionName){
        console.log(req.method,"a*************************e", actionObject.action);
        switch(req.method){
            //filter other methods, put,delete,opions
            case 'POST':
                    if(!actionObject.acceptPost){
                        console.log("here it is")
                        return false;
                    }
                if(!actionObject.postAction){
                    //the post method is not available
                    console.log("action name please",actionObject);
                    throw "Controller Action allows post but no method defined "+actionName;
                    return false;
                } else {
                    console.log("here it is-switchyyyyyyyyyyyyyyyyyyyyyy")
                    actionObject.call = actionObject.postAction;//switch action to post action
                }
                break;
            default:
                if(actionObject.action != actionObject.call){ console.log("reeeeeeeeeeeees")
                    actionObject.call = actionObject.action;//reset
                }

                if(!actionObject.acceptGet){
                    return false;
                }
                break;
        }
        return true;
    };
    routerManager.routing = function(req, res, next){
        var routeVars = routerManager.routeVars(req);
        //console.log("touer",routeVars)
        var isActionCallable = routeVars.instance[routeVars.controllerAction||configs.defaultControllerView];
        var siteGlobals = extend(configs.globals,configs.clientGlobals);
        if (routeVars.index != null && isActionCallable && routerManager.requestFilter(req,isActionCallable,routeVars.controllerAction)) {

            var autoView  = routeVars.controller+"/"+routeVars.controllerAction;
            var routeGlobals = {
                loggedInUser: req.user,//todo:hmmm?
                clientSideLogging :configs.clientSideLogging,
                pageCss: routeVars.controller+"/"+(routeVars.controllerAction||configs.defaultControllerView)
            };
            var all = extend(routeGlobals, siteGlobals);
            isActionCallable.call(req,{
                View:function(object,view){
                    res.render(view || autoView, extend(object || {},all)||all);
                },
                JSON:function(object){
                    res.send(object);
                },
                SendError:function(code,msg){
                    res.status(code||500);
                    res.send(msg);
                },
                response:res,
                next:next,
                globals:all
            });
            return all;
        } else {
            res.status(404);
            if (req.method == 'GET') {
                res.render('shared/error', extend(siteGlobals,{
                    message: routerManager.displayError,
                    clientSideLogging :configs.clientSideLogging,
                    pageCss:"404",
                    pageTitle:"Error 404"
                }));
            } else {
                res.send({
                    message: routerManager.displayError
                });
            }
        }
    };
    routerManager.abstractActions = function(objectOfActions){

    };
    var request = routerManager.routing;
    var fullRoute = function (app, routePath) {
        var partialFound = false;
        switch (routePath) {
            case "forPartials":
                app.get("/partials/*", function (req, res) {
                    res.render('../../public/app/' + req.params[0]);
                });
                break;
            default:
                break;
        }

    };


    return {
        request: request,
        fullRoute: fullRoute,
        testable:routerManager
    };
}
module.exports = routeManager();