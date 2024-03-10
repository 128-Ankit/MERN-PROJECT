const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/user-model");

const authMiddlewere = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        // If you attempt to use an expired token, you'll receive a "401 Unauthorized HTTP" response.
        return res.status(401).json({
            message: "Unauthorized HTTP, Token not provided"
        });
    }
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from auth middlewere", jwtToken);

    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRETE_KEY );
        console.log(isVerified);

        // getting the complete user details & also we don't want password to be sent
        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
        console.log("userData: ", userData);
        
        req.token = token;
        req.user = userData;
        req.userID = User._id;

        // Move on to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ 
            message: "Unauthorized. Invalid token." 
        });
    }
};
module.exports = authMiddlewere