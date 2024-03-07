const express = require("express");
const app = express();
//Importing router
const userRouter = require('./router/auth-router');
//importing Database
const database = require("./utils/database");

app.use(express.json()); //middle ware to parse the incoming request body

require("dotenv").config();
let PORT = process.env.PORT || 4000;

//database connection
database.connect();
app.use("/api/auth", userRouter);

//Rout for  home page.
// app.get("/", (req, res) => {
//     res.status(200).send("Server is running live Now")
// });

//Rout for Registration Page
// app.get("/register", (req, res) => {
//     res.send("Welcom to the Registration Page");
// });

//Rout for login page
// app.get("/login", (req, res) => {
//     res.send("Welcom  to the Login Page");
// });

//Runing the server live

app.listen(PORT, () => {
    console.log(`server started at port at PORT ${PORT}`)
});
 