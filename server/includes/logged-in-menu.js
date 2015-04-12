/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 2:33 PM
 * Description:
 */
var menuItem = require('../models/menu-item');
module.exports = [
    new menuItem("Bills","/bills"),
    new menuItem("Calendar","/calendar"),
    new menuItem("Creditors","/creditors"),
    new menuItem("Tools","/tools"),
    new menuItem("Archive","/archive"),
    new menuItem("Reports","/reports")
];