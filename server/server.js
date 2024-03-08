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

//Runing the server live
app.listen(PORT, () => {
    console.log(`server started at port at PORT ${PORT}`)
});
 