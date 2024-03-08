const express = require("express");
const router = express.Router();
const { home, Registration, Login } = require("../controllers/auth-controller");

//for Home Page
router.route("/").get(home);

//Rout API for register page
router.route('/register').post(Registration); //for Registration Page

//Rout API for login page
router.post('/login', Login);

module.exports = router;