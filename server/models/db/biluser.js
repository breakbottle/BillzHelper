/**
 * Author: Clint Small Cain
 * Date: 4/12/2015
 * Time: 11:03 AM
 * Description:
 */
/*
 CREATE TABLE `biluser` (
 `userId` int(11) NOT NULL AUTO_INCREMENT,
 `fristName` varchar(45) DEFAULT NULL,
 `lastName` varchar(45) DEFAULT NULL,
 `userName` varchar(50) DEFAULT NULL,
 `userPassword` varchar(45) DEFAULT NULL,
 `userSalt` text,
 `userEmail` varchar(50) DEFAULT NULL,
 `userActive` int(1) DEFAULT NULL,
 `userGroupId` int(4) DEFAULT NULL,
 PRIMARY KEY (`userId`)
 ) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8;

 ALTER TABLE `billmgrcal`.`biluser`
 ADD COLUMN `dateAdded` DATETIME NULL AFTER `userGroupId`,
 ADD COLUMN `dateUpdated` DATETIME NULL AFTER `dateAdded`,
 ADD UNIQUE INDEX `userName_UNIQUE` (`userName` ASC),
 ADD UNIQUE INDEX `userEmail_UNIQUE` (`userEmail` ASC);

 ALTER TABLE  `biluser` CHANGE  `dateUpdated`  `dateUpdated` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP



 */


module.exports =  function(db,cb){
    db.define("biluser",{
        userName         : String,
        userPassword     : String,
        userSalt         : String,
        userEmail        : String,
        userId          : Number
    },{
        id : 'userId'
    });
    if(cb)
        return cb();
};