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
            console.log("User Already exist");
            return res.status(400).json({
                success: false,
                msg: "User Already Exist",
            });
        }

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
            token: await newUser.generateToken(),
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
        //get data from req body
        const { email, password } = req.body;

        //validation that is email(user) exist or not
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            console.log("User not registered");
            return res.status(400).json({
                success: false,
                msg: "User not registered"
            });
        }
        //if user exist, then compare password for login
        const validPassword = await userExist.comparePassword(password);
        
        if (validPassword) {
            console.log("Login Successfully");
            res.status(200).json({
                success: true,
                msg: "Login Successfully",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            console.log("Invalid Password!");
            return res.status(401).json({
                success: false,
                msg: "Invalid Password!"
            });
        }

    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({
            success: false,
            msg: 'Server Error! Failed in login try agian'
        });
    }
};

module.exports = { home, Registration, Login };