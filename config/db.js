const mysql = require('mysql');

//THE CONNECTION (API and MySQL) WILL ALWAYS OPEN
//THIS ONLY FOR LAPTOP OR DEVELOPMENT USE
//const dbConf = mysql.createConnection()


//THE CONNECTION (API and MySQL) WILL OPEN WHEN THERE IS A REQUEST
//THIS CAN BE USED ON LAPTOP OR DEVELOPMENT USE EITHER ON SERVER USE
const dbConf = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    //noneedport cause its default
})


module.exports = { dbConf }