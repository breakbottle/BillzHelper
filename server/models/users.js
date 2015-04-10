/**
 * Author: Clint Small Cain
 * Date: 4/5/2015
 * Time: 6:05 PM
 * Description:
 */
module.exports = function(userName,userPassword,userSalt,userEmail,firstName,lastName,userActive,userGroupId){

    return {
        userId:0,
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        userSalt:userSalt,
        userActive:userActive,
        userGroupId:userGroupId
    }
};