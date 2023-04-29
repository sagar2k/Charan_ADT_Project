const express = require("express");
const journaldeleteController = require('../controllers/journal_deleteController');
const todolistdeleteController = require('../controllers/todolist_deleteController');
const router = express.Router();

router.post('/journal', journaldeleteController.journal_delete);

router.post('/todolist', todolistdeleteController.todolist_delete);

module.exports = router;