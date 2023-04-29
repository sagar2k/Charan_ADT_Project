// // homeController.js

// //const getUserByUsername = require('./userController.js').getUserByUsername;
// // const userController = require('./userController.js');
// // const username = require('./login').username;
// // console.log(username)
// const url = require('url');
// const mysql = require("mysql");
// exports.showHomePage = async (req, res) => {
    
//     const username = require('./login');
//     //console.log('I am here in home Controller1')
//     //console.log(username)
//     //console.log('I am here in home Controller2')

//     // const urlString = 'http://example.com/home?username=sachin';
//     // const urlObj = url.parse(urlString, true);
//     // const username = urlObj.query.username;

//     //const { username } = req.params;
  
//     // Retrieve the user's information from the database using the username
//     const userController = require('./userController.js');
//     //console.log(username)
//     const user = await userController.getUserByUsername(username);
//     console.log('I am here in home Controller3')
//     //console.log(user.username)
//     // Render the home page view with the user's information


//     const connection = mysql.createConnection({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         password:process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE 
//     });
//     var data = [];
//     connection.query(`SELECT * FROM journalEntry INNER JOIN ToDoList ON journalEntry.date1 = ToDoList.date1 WHERE journalEntry.user_name = '${username}'  and ToDoList.user_name = '${username}'`, (error, results) => {
//         if(error){
//             console.log(error)
//         }
//         // // Create an array to store the data
//         // const data = [];
        
//         // Iterate over the result set and store the data in the array
//         console.log('I am in query')
//         for (let i = 0; i < results.length; i++) {
//             const row = results[i];
//             const item = {
//             date: row.date1,
//             journal_text: row.content,
//             id: row.user_name,
//             to_do1: row.priority1,
//             to_do2: row.priority2,
//             to_do3: row.priority3
//             };
//             data.push(item);
//         }
//         return res.render('after_login_frontpage', {data:data,user:user});
// });
// console.log(data)
// //return res.render('after_login_frontpage', {data:data,user:user});
// }
const url = require('url');
const mysql = require("mysql");
const userController = require('./userController.js');

exports.showHomePage = async (req, res) => {
    
    const username = require('./login');

    const user = await userController.getUserByUsername(username);

    const connection = mysql.createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password:process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE 
    });

    const query = `SELECT * FROM journalEntry  WHERE user_name = '${username}' ORDER BY date1 DESC`;
    const data = await new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if(error){
                console.log(error)
                reject(error);
            }
            else {
                const data = results.map(row => ({
                    date: row.date1,
                    journal_text: row.content,
                    id: row.user_name
                    // to_do1: row.priority1,
                    // to_do2: row.priority2,
                    // to_do3: row.priority3
                }));
                resolve(data);
            }
        });
    });

///
    const query1 = `SELECT * FROM ToDoList  WHERE user_name = '${username}' ORDER BY date1 DESC`;
    const data1 = await new Promise((resolve, reject) => {
        connection.query(query1, (error, results) => {
            if(error){
                console.log(error)
                reject(error);
            }
            else {
                const data1 = results.map(row => ({
                    date: row.date1,
                    // journal_text: row.content,
                    id: row.user_name,
                    to_do1: row.priority1,
                    to_do2: row.priority2,
                    to_do3: row.priority3
                }));
                resolve(data1);
            }
        });
    });
///
    //return res.render('after_login_frontpage', {data: data, user: user});
    return res.render('after_login_frontpage', {data: data, user: user,data1:data1});
};
