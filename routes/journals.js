const express = require("express");
const journalController = require('../controllers/journalController');
const router = express.Router();



router.post('/journalspage', journalController.journal_data);


module.exports = router;