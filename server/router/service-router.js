const express = require("express");
const services = require("../controllers/services-controler");
const router = express.Router();

router.route("/services").get(services);

module.exports = router;