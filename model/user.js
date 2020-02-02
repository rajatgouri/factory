const database = require('../util/database');

module.exports = class User {
    constructor( email, password,  ...params) {
        this.username = email;
        this.password = password;
        this.name = params[0];
        this.phone = params[1];
        this.country = params[2];
        this.state = params[3]

        

        }

        // create table if not exists user (id INTEGER(11) NOT NULL AUTO_INCREMENT UNIQUE, name VARCHAR(25) NOT NULL, email VARCHAR(45) NOT NULL UNIQUE, password VARCHAR(8) NOT NULL,  phone VARCHAR(10) NOT NULL,  country VARCHAR(20) NOT NULL, state VARCHAR(15) NOT NULL,usertype VARCHAR(15) NOT NULL, createdOn VARCHAR(65) NOT NULL, updatedON VARCHAR(65) NOT NULL,  PRIMARY KEY(id)
    save() {
       let time = new Date();
       let userType = 'salesmen'
       
      return database.execute(`insert into user (name, email, password, phone, country, state, usertype, createdOn, updatedOn) values('${this.name}','${this.username}','${this.password}','${this.phone}','${this.country}','${this.state}','${userType}','${time}','${time}')`);
    }

    findByemail() {
        return database.execute(`select * from user where email = '${this.username}' and password = '${this.password}'`);      
    }

  
};
