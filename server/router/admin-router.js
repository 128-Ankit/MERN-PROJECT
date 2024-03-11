const express = require("express");
const router = express.Router();
const { getAllUsers, getAllContacts } = require("../controllers/getAllUsers-controller");
const authMeddleware = require("../middleware/auth-middleware");
const adminMiddleware = require('../middleware/admin-middleware');


router.route('/users').get(authMeddleware, adminMiddleware, getAllUsers)
router.route('/contacts').get(getAllContacts)

module.exports = router;