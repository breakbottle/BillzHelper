/**
 * Author: Clint Small Cain
 * Date: 4/4/2015
 * Time: 12:55 PM
 * Description:
 */
var crypto = require("crypto");

var createSalt = function(){
    return crypto.randomBytes(128).toString('base64');
};
var hashPassword = function(salt,pwd){
    console.log("what is password",pwd)
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');

};

module.exports = {
    createSalt:createSalt,
    hashPassword:hashPassword
}