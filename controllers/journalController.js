const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});


exports.journal_data = async (req,res) => {
    //console.log(req.body);
    const date_temp = req.body.date_picker;
    const journal_content = req.body.journal_text;

    
    const username = require('./login');
    
    console.log('This is the username');
    console.log('I am in JournalController')
    console.log(username)
    // const user = await userController.getUserByUsername(username);
    // console.log(user)
    db.query('INSERT INTO JournalEntry SET ?',{user_name:username,content:journal_content,date1:date_temp},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            //console.log(results);
            return res.render('journals');
            
        }
    })

    };

    