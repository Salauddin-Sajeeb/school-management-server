const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const con = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,

});
con.connect((err) => {
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
