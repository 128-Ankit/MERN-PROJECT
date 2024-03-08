const express = require("express");
const app = express();
//Importing router
const userRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router'); 
//importing Database
const database = require("./utils/database");

app.use(express.json()); //middle ware to parse the incoming request body

require("dotenv").config();
let PORT = process.env.PORT || 4000;

//database connection
database.connect();
//Routes
app.use("/api/auth", userRouter);
app.use("/api/form", contactRouter);


//Runing the server live
app.listen(PORT, () => {
    console.log(`server started at port at PORT ${PORT}`)
});
 