const express = require("express");

const TodolistController = require('../controllers/todolistController');
const router = express.Router();



router.post('/todolistpage', TodolistController.todolist_data);
router.post('/todolisteval', TodolistController.todolist_eval);
router.post('/todolistevalvisual', TodolistController.todolist_eval_visual);

module.exports = router;