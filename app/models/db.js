const mysql = require("mysql2");
require("dotenv").config();
const dbConfig = require("../config/db.config.js");
console.log("DB ENV", process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
const con = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port:dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  connectTimeout: 15000

});
con.getConnection((err) => {
  if (!err) {
    console.log("Mysql database connection succeeded.");
  } else
    console.log( 
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
});
setInterval(function () {
  con.query('SELECT 1');
}, 33000);

module.exports = con;
