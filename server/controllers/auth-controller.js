const User = require("../models/user-model");
const bcrypt = require('bcrypt');

/*  For Home Page */
const home = async (req, res) => {
    try {
        res.status(200).send("Server is running live Now Using router API");
    } catch (error) {
        console.log('Got Error: ', error);
        res.status(400).send("Page not found!");
    }
};

/*  For Registration Page */
const Registration = async (req, res) => {
    try {
        //fetch data from req body
        const { username, email, phoneNumber, password } = req.body;

        //check is user already exist or not
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                msg: "User Already Exist",
            });
        }

        //hash Password
        // const salt = 10;
        // const hash_password = await bcrypt.hash(password, salt);
        //const hash_password = await bcrypt.hash(password, 10);

        //create user 

        const newUser = await User.create({
            username,
            email,
            phoneNumber,
            password,
            // password: hash_password
        });

        //return reponse
        res.status(200).json({
            success: true,
            msg: "User Created Successfully",
            data: newUser,
            token : await newUser.generateToken(),
            userId: newUser._id.toString(),
        });

    } catch (error) {
        console.log("Error in user registration : ", error);
        return res.status(400).json({
            success: false,
            msg: "Registraition field, try again"
        });
    }
};

/*  For Login Page */
const Login = async (req, res) => {
    try {
        console.log(req.body);
        res.status(200).send("wellcom to the login page using controller");
    } catch (error) {
        console.log("Got Error", error);
        res.status(500).send("Page Not Found");
    }
};

module.exports = { home, Registration, Login };