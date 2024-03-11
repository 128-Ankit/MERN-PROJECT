const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

});

//Protecting password
userSchema.pre("save", async function (next) {
    console.log("pre method", this);
    const User = this;

    if (!User.isModified("password")) {
        next();
    }
    //Hash the password with bc
    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(User.password, salt);
        User.password = hash_password;
    } catch (error) {
        next(error);
    }

})

//cmpare password
userSchema.methods.comparePassword = async function (password) {
    return  await bcrypt.compare(password, this.password);
} 

// json web token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
            process.env.JWT_SECRETE_KEY,
            { expiresIn: "48h", }
        )
    } catch (error) {

    }
}

module.exports = mongoose.model("User", userSchema);

