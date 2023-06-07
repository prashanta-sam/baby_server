// const {Sequelize} = require("sequelize");
// const sequelize = new Sequelize("sqlite::memory:");
// const Products = require('./models/products');

// return sequelize.authenticate()
//     .then(result => {
//         console.log(`SQLite successfully connected!`);
//         return Products.sync();
//     })
//     .then(result => {
//         console.log(`Products table created`);
//         return result;
//     })
//     .catch(error => {
//         console.error('Unable to connect to SQLite database:', error);
//     })

const config = require('./config.json');
const mysql = require('mysql2');
//============= for mysql
// const con=require('mysql')
const {host,user,password,database}=config.DATABASE
const conn = mysql.createConnection({
  host,
  user,
  password,
  database
})

conn.connect(function(err) {
  if (err) throw err
  console.log(`MySql database connected..`)
})

//============= for mysql2



// const db = mysql.createPool({
//     host: "localhost",
//     user: "",
//     password: "",
//     database: "",
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0
//     // here you can set connection limits and so on
// });
// db.connect(function(err) {
//   if (err) throw err
//   console.log('connected')
// })

module.exports = conn;




//=========================== to use alias in package.json
// npm install module-alias
// in package.json
// "_moduleAliases": {
//     "@root": ".",
//     "@models": "./models",
//     "@routes": "./routes",
//     "@utils": "./utils",
//     "@config": "./config",
//     "@controllers": "./controllers"
//   }