const express = require("express");
const router = express.Router();

///const user = require('../controllers/login').user;///

router.get('/',(req,res) =>{
    res.render('website_front_page');
});

router.get('/register',(req,res) =>{
    res.render('register');
});

router.get('/login',(req,res) =>{
    res.render('login');
});

router.get('/journals',(req,res) =>{
    res.render('journals');
});

router.get('/todolist',(req,res) =>{
    res.render('todolist');
});
router.get('/todolisteval',(req,res) =>{
    res.render('todolist_eval');
});

router.get('/update_password_page',(req,res) =>{
    res.render('update-password');
});



////
const TodolistController = require('../controllers/todolistController');
router.get('/todolistevalvisual', TodolistController.todolist_eval_visual);
///


///
const homeController = require('../controllers/homeController');
router.get('/home', homeController.showHomePage);
///





module.exports = router;