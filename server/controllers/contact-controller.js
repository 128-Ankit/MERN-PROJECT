const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        console.log('Contact Form Submitted');
        return res.status(200).json({
            success: true,
            msg: 'Contact form submitted successfully!',
            data: response
        });
    } catch (error) {
        console.log("error to submit contact form", error);
        return res.status(400).json({
            success: false,
            msg: "Contact form submission failed!"
        });
    }
}
module.exports = { contactForm };