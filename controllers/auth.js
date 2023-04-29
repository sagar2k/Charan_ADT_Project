const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

exports.register = (req,res) => {
    console.log(req.body);
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.pswd;
    const passwordConfirm = req.body.passwordConfirm;


    // const {name,email,password,passwordConfirm} = req.body;

    db.query('SELECT email FROM Users WHERE email = ?',[email], async (error,results)=>{
        if(error){
            console.log(error)
        } 

        if(results.length>0){
            return res.render('register',{
                message: 'That Email is already in Use'
            })
        } else if(password !== passwordConfirm){
            return res.render('register',{
                message: 'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password,8);
        console.log(hashedPassword);
        // res.send("testing");

        db.query('INSERT INTO Users SET ?',{username:name,password:hashedPassword,email:email},(error,results)=>{
            if(error){
                console.log(error);
            } else{
                console.log(results);
                return res.render('register',{
                    message: 'User Registered'
                });
                
            }
        })

    });



    // res.send("Form Submitted");
};