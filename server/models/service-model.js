const { Schema, model, mongoose } = require("mongoose");
const { schema } = require("./user-model");

const serviceScheema = new Schema({
    service: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: String, required: true },
    provider: { type: String, required: true },
});

const Service = new model("Service", serviceScheema);
module.exports = Service;