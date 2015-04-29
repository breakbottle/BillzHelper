/**
 * Author: Clint Small Cain
 * Date: 4/28/2015
 * Time: 8:08 PM
 * Description:
 */
var severConfigs = function(
    environment,
    dbConnection
    ){
        this.environment = environment;
        this.dbConnection = dbConnection;
};


var aconfig = {
    development:new severConfigs('development',
        {
            data:{
                mysql:{
                    host     : 'localhost',
                    user     : 'bills',
                    password : 'bill',
                    database : 'bill'
                }
            }
        }
    ),production:new severConfigs('production',
        {
            data:{
                mysql:{
                    host     : 'localhost',
                    user     : 'bills',
                    password : 'bill',
                    database : 'bill'
                }
            }
        }
    )
};
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports =  aconfig[process.env.NODE_ENV];
