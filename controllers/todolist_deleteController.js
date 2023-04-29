
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});


exports.todolist_delete = (req,res) => {
    console.log('I am in todolist_delete controller')
    console.log(req.body)
    const id = req.body.id;
    console.log(id);
    db.query("DELETE FROM ToDoList WHERE date1 = ?", [id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete record" });
      } else {
        //res.status(200).json({ message: "Record deleted successfully" });
        return res.redirect('/home');
      }
    });
  };