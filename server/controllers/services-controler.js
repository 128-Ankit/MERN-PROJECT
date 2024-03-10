const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        //fetcch data from server
        const response = await Service.find();
        //validation
        if (!response) {
            res.status(404).json({
                success: false,
                msg: "No service found"
            });
        }
        //return response
        return res.status(200).json({
            success: true,
            msg: 'Services found successfully', response,
        });

    } catch (error) {
        console.log("Error duering get data from db", error);
        return res.status(500).json({
            success: false,
            msg: 'failed to get data from server'
        });
    }
};

module.exports = services;