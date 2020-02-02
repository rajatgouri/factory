const mysql = require('mysql2');
const config = require('../config');

const pool = mysql.createPool({
    host: config.dbUrl,
    user: config.dbUser,
    database: config.dbName,
    password: config.dbPassword
});

pool.promise().execute(`create table if not exists user (id INTEGER(11) NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(20) NOT NULL, email VARCHAR(25) NOT NULL UNIQUE, password VARCHAR(8) NOT NULL, phone VARCHAR(10) NOT NULL, country VARCHAR(20) NOT NULL, state VARCHAR(20) NOT NULL, usertype VARCHAR(20) NOT NULL, createdOn VARCHAR(65) NOT NULL, updatedOn VARCHAR(65) NOT NULL, PRIMARY KEY(id) ) `)
  .then(res => {
      console.log('user table is created if not exists');
  })
  .catch(error => console.error(error));

module.exports = pool.promise();