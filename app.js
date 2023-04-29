const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
dotenv.config({ path:'./.env'});
//const chart = require('chart.js');
///
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
///
const app = express();

///
app.use(session({
    secret: 'webslesson',
    resave : true,
    saveUninitialized: true
}));
///


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});
const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');

db.connect((error) =>{
    if(error){
        console.log(error)
    } else{
        console.log("MySQL Connected...Yayy!!")
    }
});


//Define Routes
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); 
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use('/home',require('./routes/pages'));
app.use('/journals',require('./routes/journals'));
app.use('/todolist',require('./routes/todolist'));
app.use('/todoeval',require('./routes/todolist'));
app.use('/delete',require('./routes/delete_route'));
app.use('/update',require('./routes/update_route'));


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });


app.listen(process.env.PORT || 5555,() =>{
    console.log("Server started on pORT 5555")
}); 