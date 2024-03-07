const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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


// const User = new mongoose.model('User', userSchema);
// module.exports = User;

/* OR */
module.exports = mongoose.model("User", userSchema);