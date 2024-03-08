const express = require("express");
const router = express.Router();
const contact_Form = require("../controllers/contact-controller");

router.route("/contact").post(contact_Form.contactForm);

module.exports = router;