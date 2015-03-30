/**
 * Author: Clint Small Cain
 * Date: 3/29/2015
 * Time: 5:08 PM
 * Description:
 */
var configs = require('./configs');
var routeVars = require('../models/route-vars');
var extend = require('util')._extend;
var routeManager = function()
{
    var routerManger = this;
    routerManger.routeVars = function (request) {
        var vars = new routeVars();
        var getActions = request._parsedOriginalUrl.pathname.split("/");
        vars.controller = getActions[1] || configs.defaultController;
        vars.controllerAction = getActions[2] || "";
        console.log("ok ok ok",vars)
        for (var i = 0; i < configs.controllers.length; i++) {
            //only load request name
            if (vars.controller == configs.controllers[i].name) {
                vars.instance = configs.autoLoadControllers(configs.controllers[i].name);
                vars.index = i;
            }
        }
        return vars;
    };
    var appGet = function (req, res, next) {//change app.get to app.all to get all request..you can separate these request by post,post get ect

        var routeVars = routerManger.routeVars(req);
        var isActionCallable = routeVars.instance[routeVars.controllerAction||configs.defaultControllerView];

        if (routeVars.index != null && isActionCallable) {
            var siteGlobals = extend(configs.globals,configs.clientGlobals);
            configs.controllers[routeVars.index].viewModel = extend(configs.controllers[routeVars.index].viewModel,isActionCallable(siteGlobals,req));
            var view  = routeVars.controller+"/"+routeVars.controllerAction;
            var routeGlobals = {
                loggedInUser: req.user,//todo:hmmm?
                pageCss: routeVars.controller+"/"+(routeVars.controllerAction||configs.defaultControllerView)
            };
            var all = extend(routeGlobals, configs.controllers[routeVars.index].viewModel);
            res.render(view, extend(all,configs.clientGlobals));
        } else {
            //res.status(404);
            if (req.method == 'GET') {
                res.render('shared/error', {
                    message: 'Page you looking for cannot be found'
                });
            } else {
                res.send({
                    message: 'Page you looking for cannot be found'
                });
            }
        }


    };
    var appPost = function (req, res, next) {

    };
    var fullRoute = function (app, routePath) {//
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
    var load = function (controllers) {
        //check controlls to see if allow for post

        /*app.get("/partials/*",function(req,res){
         res.render('../../public/app/'+req.params[0]);
         });
         app.post('/logout',function(req, res,next){
         console.log('wer are out');
         req.logout();
         res.end();//redirect from server to logout landing page.
         });*/
        var controllersList = controllers || [];
        if (controllersList.length > 0) {
            for (var i = 0; i < controllersList.length; i++) {
                // if(controllersList[i].)
            }
        }

    };

    return {
        get: appGet,
        post: appPost,
        routeVars: routeVars,
        fullRoute: fullRoute
    };
}
module.exports = routeManager();