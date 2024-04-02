const { Schema, model } = require("mongoose");

// Define the schema
const contactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});

// Create and export the model
module.exports = model('Contact', contactSchema);

