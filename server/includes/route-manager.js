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
    var routerManger = this;
    routerManger.displayError =  'The page your are looking for cannot be found.';
    routerManger.routeVars = function (request) {
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
    routerManger.requestFilter = function(req,index){
        switch(req.method){
            //filter other methods, put,delete,opions
            case 'POST':
                    if(!configs.controllers[index].acceptPost){
                        return false;
                    }
                break;
            default:
                if(!configs.controllers[index].acceptGet){
                    return false;
                }
                break;
        }
        return true;
    };
    routerManger.routing = function(req, res, next){
        var routeVars = routerManger.routeVars(req);
        var isActionCallable = routeVars.instance[routeVars.controllerAction||configs.defaultControllerView];
        if (routeVars.index != null && isActionCallable && routerManger.requestFilter(req,routeVars.index)) {
            var siteGlobals = extend(configs.globals,configs.clientGlobals);
            var autoView  = routeVars.controller+"/"+routeVars.controllerAction;
            var routeGlobals = {
                loggedInUser: req.user,//todo:hmmm?
                pageCss: routeVars.controller+"/"+(routeVars.controllerAction||configs.defaultControllerView)
            };
            var all = extend(routeGlobals, siteGlobals);
            isActionCallable(req,{
                View:function(object,view){
                    res.render(view || autoView, extend(object || {},all)||all);
                },
                response:res,
                next:next,
                globals:all
            });
            return all;
        } else {
            res.status(404);
            if (req.method == 'GET') {
                res.render('shared/error', {
                    message: routerManger.displayError
                });
            } else {
                res.send({
                    message: routerManger.displayError
                });
            }
        }
    };
    var request = routerManger.routing;
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
        testable:routerManger
    };
}
module.exports = routeManager();