const express = require("express");
const app = express();
//Importing router
const userRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router'); 
const serviceRouter = require("./router/service-router");
const adminRouter = require("./router/admin-router");
const cors = require( "cors" );
//importing Database
const database = require("./utils/database");

//handle cors to connect with frontend
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    Credentials : true,
}
app.use(cors(corsOptions));

app.use(express.json()); //middle ware to parse the incoming request body

require("dotenv").config();
let PORT = process.env.PORT || 4000;

//database connection
database.connect();
//Routes
app.use("/api/auth", userRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);

//defining admin route
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`server started at port at PORT ${PORT}`)
});
 