const express = require("express");
const router = express.Router();
const {home, Registration, Login } = require("../controllers/auth-controller");

// router.get("/", (req, res) => {
//     res.status(200).send("Server is running live Now Using router")
// }); 

/* OR */
//default routh for  home page
// router.route("/").get((req,res) => {
//     res.status(200).send("Server is running live Now Using router API");
// });

router.route( "/" ).get( home ); //for Home Page


//Rout API for regiter page
// router.route('/register').get((req,res)=> {
//     res.status(200).send("This is the data from register Page");
// });

// router.route('/register').get(Registration); //for Registration Page
router.route('/register').post(Registration); //for Registration Page

//Rout API for login page
// router.route('/login').get((req,res)=> {
//     res.status(200).send("This is the data from login Page");
// });

// router.route('/login').get(Login); *OR*
router.get('/login',Login); //for login page


module.exports = router;