const User = require("../models/user-model")
const Contact = require("../models/contact-model");

// ------------------------------------------------
//              Get All useer 
// ------------------------------------------------
const getAllUsers = async (req, res) => {
    try {
        //get data from db
        const users = await User.find({}, { password: 0 });
        // console.log(users);
        //validation
        if (!users || users.length === 0) {
            return res.status(401).json({
                msg: "No user found"
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            msg: 'All users found',
            data: users,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            msg: 'Server error'
        });
    }
}

const deleteUserById = async (req , res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({_id: id});
        res.status(200).json({
            msg: 'User Deleted Successfully'
        })
    } catch (error) {
        console.log("Error in deleting the user : ", error);
        res.status(500).json({
            msg:"Error  in deleting the user"
        });
    }
}

// ------------------------------------------------
//              Get useer contacts
// ------------------------------------------------
const getAllContacts = async (req, res) => {
    try {
        //fetch data from db
        const constacts = await Contact.find();
        //checking for data existence
        if(!constacts || constacts.length == 0){
            return res.status(400).json({
                success:false,
                msg: "There are no contacts in the database."
            });
        }
        //return response
        return  res.status(200).json({
            success :true ,
            count   :constacts,
            msg: 'Contacts got successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false,
            msg: 'Server error'
        });
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserById }