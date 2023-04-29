const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const chart = require('chart.js');
const json = require("body-parser/lib/types/json");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE 
});

exports.todolist_data = (req,res) => {
    //console.log(req.body);
    const date_temp = req.body.date_picker;
    const Priority_1 = req.body.priority1;
    const Priority_2 = req.body.priority2;
    const Priority_3 = req.body.priority3;

    const username = require('./login');
    console.log('This is the username')
    console.log(username)

    db.query('INSERT INTO ToDoList SET ?',{user_name:username,priority1:Priority_1,priority2:Priority_2,priority3:Priority_3,date1:date_temp},(error,results)=>{
        if(error){
            console.log(error);
        } else{
            console.log(results);
            return res.render('todolist',{
                message: 'Your TodoList got noted'
            });
            
        }
    })

    };

    exports.todolist_eval = (req,res) => {
        //console.log(req.body);
        const date_temp = req.body.date_picker;
        const Priority_1 = req.body.p1_is_complete;
        const Priority_2 = req.body.p2_is_complete;
        const Priority_3 = req.body.p3_is_complete;
    
        const username = require('./login');
        console.log('This is the username')
        console.log(username)
    
        db.query('INSERT INTO ToDoItem SET ?',{user_name:username,p1_is_complete:Priority_1,p2_is_complete:Priority_2,p3_is_complete:Priority_3,date1:date_temp},(error,results)=>{
            if(error){
                console.log(error);
            } else{
                console.log(results);
                return res.render('todolist_eval',{
                    message: 'Your TodoItem got noted'
                });
                
            }
        })
    
        };

    exports.todolist_eval_visual = async (req,res) => {
        const username = require('./login');
        console.log('This is the username')
        console.log(username)
        
        const query1 = `SELECT todo_item_id,user_name,date1,(CASE WHEN p1_is_complete = 'on' THEN 1 ELSE 0 END) + (CASE WHEN p2_is_complete = 'on' THEN 1 ELSE 0 END) + (CASE WHEN p3_is_complete = 'on' THEN 1 ELSE 0 END) AS on_count FROM todoitem WHERE user_name = '${username}' ORDER BY date1`;
        const data1 = await new Promise((resolve, reject) => {
            db.query(query1, (error, results) => {
                if(error){
                    console.log(error)
                    reject(error);
                }
                else {
                    //console.log(results)
                    const data1 = results.map(row => ({
                        date: row.date1,
                        // journal_text: row.content,
                        id: row.user_name,
                        count: row.on_count
                        
                    }));
                    resolve(data1);
                }
            });
            
        });
        //return res.render('todolist_eval_visual', {data1:JSON.stringify(data1)});
        console.log('I am just before rendering');
        //console.log(data1)
        const dates = data1.map(d => d.date)
        //console.log(data1.map(d => d.date))
        const counts = data1.map(d => d.count)
        //console.log(data1.map(d => d.count))
        //console.log(data1);
        //const temp1 = data1 | json
        //console.log(temp1);
        //const temp  = `${JSON.stringify(data1)}`
        //console.log(temp)
        return res.render('todolist_eval_visual', {dates:dates,counts:counts});

        
        };