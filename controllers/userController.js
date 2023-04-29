// userController.js

const mysql = require('mysql');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// // Create a MySQL connection pool
// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE 
// });

// // Define a function to fetch user data from the database based on the username
// function getUserByUsername(username, callback) {

//     const connection = mysql.createConnection({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         password:process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE 
//       });
    
//       connection.connect();
    
//       const sql = `SELECT * FROM Users WHERE username = '${username}'`;
    
//       connection.query(sql, (err, results, fields) => {
//         if (err){
//             console.error(err)
//         }
//         if (results.length > 0) {
//             const user = results[0];
//             console.log('I am in userController')
//             console.log(user.username);
//             return results[0];
//             //return callback(null, rows[0]);
//           }
//       });
    
//       connection.end();
//     }

//   // Acquire a connection from the pool
//   // db.getConnection((err, connection) => {
//   //   if (err) {
//   //     console.error(err);
//   //     return callback(err);
//   //   }

//   // Prepare the SQL query to fetch user data based on the provided username
//   const query = `SELECT * FROM Users WHERE username = '${username}'`;

//   // Execute the SQL query with the provided username as a parameter
//   db.query(query, (err, results) => {
//     // Release the connection back to the pool
//     //connection.release();

//     if (err) {
//       console.error(err);
//       //return callback(err);
//     }

//     // If a user was found, return the user object
//     if (results.length > 0) {
//       const user = results[0];
//       console.log('I am in userController')
//       console.log(user.username);
//       return results[0];
//       //return callback(null, rows[0]);
//     }

//     // If no user was found, return null
//     // return res.render('login',{
//     //   message: 'User Not Found In Database'});
//   });
//   ///});
// }
// module.exports = getUserByUsername;

///
// module.exports = {
//     getUserByUsername: function(username1) {
//         const connection = mysql.createConnection({
//             host: process.env.DATABASE_HOST,
//             user: process.env.DATABASE_USER,
//             password:process.env.DATABASE_PASSWORD,
//             database: process.env.DATABASE 
//           });
        
//           connection.connect();
        
//           //const sql = `SELECT * FROM Users WHERE username = '${username1}'`;
//           const sql = `SELECT * FROM Users WHERE username = 'charan351'`;
//           //const sql = `SELECT * FROM Users`;
//           //const sql = `SELECT count(*) FROM Users`;
        
//           connection.query(sql,async (err, results, fields) => {
//             if (err){
//                 console.error(err)
//             } else{
//                 const user = results[0];
//                 console.log('I am in userController')
//                 console.log(user)
//                 //console.log(user.username);
//                 return user;
//                 //return callback(null, rows[0]);
//               }
//           });
        
//           connection.end();
//         }
//     }
    ///
//}

// if (results.length > 0) 









// function getUserByUsername(username) {
//     // SQL query logic here
//     const connection = mysql.createConnection({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         password:process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE 
//       });
    
//       connection.connect();
    
//       //const sql = `SELECT * FROM Users WHERE username = '${username1}'`;
//       const sql = `SELECT * FROM Users WHERE username = 'charan351'`;
//       //const sql = `SELECT * FROM Users`;
//       //const sql = `SELECT count(*) FROM Users`;
    
//       connection.query(sql,async (err, results, fields) => {
//         if (err){
//             console.error(err)
//         } else{
//             const user = results[0];
//             console.log('I am in userController')
//             console.log(user)
//             //console.log(user.username);
//             return user;
//             //return callback(null, rows[0]);
//           }
//       });
    
//       connection.end();
//   }
  
//   module.exports = {
//     getUserByUsername
//   };


  function getUserByUsername(username) {
    const connection = mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE 
    });
  
    return new Promise((resolve, reject) => {
      connection.connect();
  
      const sql = `SELECT * FROM Users WHERE username = '${username}'`;
  
      connection.query(sql, (err, results, fields) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          const user = results[0];
          //console.log('I am in userController');
          //console.log(user);
          resolve(user);
        }
        connection.end();
      });
    });
  }
  
  module.exports = {
    getUserByUsername
  };
  