const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

exports.login = (req,res) => {
    console.log(req.body);
    const email = req.body.login_email;
    const password = req.body.login_password;
    

    // Retrieve user from database
    db.query(`SELECT * FROM Users WHERE email = '${email}'`, (error, results) => {
        if(error){
            console.log(error)
        }

        if (results.length > 0) {
        const user = results[0];
        
        //console.log(user);


            // Compare password with hashed password in database
            bcrypt.compare(password, user.password, (error, result) => {
                if(error){
                    console.log(error)
                }

                if (result) {
                // Passwords match - login successful
                // res.send('Login successful!');
                console.log('I am here');
                const username = user.username;////
                module.exports = username;
                console.log(username); ///
                //res.render('after_login_frontpage',{user}); ///
                res.redirect('/home?username=' + username);
                
                
                } else {
                // Passwords do not match - login failed
                // res.send('Invalid username or password');
                return res.render('login',{
                    message: 'In-Valid Credentials!!'});
                }
            });
            } else {
            // User not found in database - login failed
            // res.send('Invalid username or password');
            return res.render('login',{
                message: 'User Not Found In Database'});
            }
        });
};
        


    // const {name,email,password,passwordConfirm} = req.body;

    // db.query('SELECT email FROM Users WHERE email = ?',[email], async (error,results)=>{
    //     if(error){
    //         console.log(error)
    //     } 

    //     if(results.length>0){
    //         return res.render('register',{
    //             message: 'That Email is already in Use'
    //         })
    //     } else if(password !== passwordConfirm){
    //         return res.render('register',{
    //             message: 'Password do not match'
    //         });
    //     }

    //     let hashedPassword = await bcrypt.hash(password,8);
    //     console.log(hashedPassword);
    //     // res.send("testing");

    //     db.query('INSERT INTO Users SET ?',{username:name,password:hashedPassword,email:email},(error,results)=>{
    //         if(error){
    //             console.log(error);
    //         } else{
    //             console.log(results);
    //             return res.render('register',{
    //                 message: 'User Registered'
    //             });
                
    //         }
    //     })

    // });



    // res.send("Form Submitted");
