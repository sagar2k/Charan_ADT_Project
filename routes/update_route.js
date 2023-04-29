const express = require("express");
const passwordupdateController = require('../controllers/password_updateController');
const router = express.Router();



router.post('/password_update_page', passwordupdateController.password_update);


module.exports = router;