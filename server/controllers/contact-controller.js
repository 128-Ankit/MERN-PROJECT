const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const {username, email, message} = req.body;
        console.log(req.body)
        // Assuming that Contact.create() returns the created contact object
        const createdContact = await Contact.create(new Contact({name:username, email, message}));
    
        return res.status(200).json({
            success: true,
            msg: 'Contact form submitted successfully!',
            data: createdContact,
        });
    } catch (error) {
        console.log("Error submitting contact form:", error);
        return res.status(400).json({
            success: false,
            msg: "Contact form submission failed!"
        });
    }
}

module.exports = { contactForm };
