const express = require("express");
const router = express.Router();
const { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById } = require("../controllers/getAllUsers-controller");
const authMeddleware = require("../middleware/auth-middleware");
const adminMiddleware = require('../middleware/admin-middleware');
const authMiddlewere = require("../middleware/auth-middleware");


router.route('/users').get(authMeddleware, adminMiddleware, getAllUsers);
router.route('/users/:id').get(authMiddlewere, adminMiddleware, getUserById);
router.route('/users/update/:id').patch(authMiddlewere, adminMiddleware, updateUserById);
router.route('/users/delete/:id').delete(authMiddlewere, adminMiddleware, deleteUserById);
router.route('/contacts').get(getAllContacts);

module.exports = router;