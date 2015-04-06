/**
 * Author: Clint Small Cain
 * Date: 4/5/2015
 * Time: 6:05 PM
 * Description:
 */
module.exports = function(userName,userPassword,userEmail,nickName,firstName,lastName,userActive,userGroup){

    return {
        userId:0,
        nickName:nickName,
        firstName:firstName,
        lastName:lastName,
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        userActive:userActive,
        userGroup:userGroup
    }
};