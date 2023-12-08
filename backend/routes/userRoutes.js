const express = require('express');
const { registerUser, loginUser, logout,  getUserDetails,updateUser, deleteUser, getAllUser, getSingleUser } = require('../controllers/userController');
const { } = require('../middleware/authentication');

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/admin/users").get(getAllUser);

router.route("/admin/user/:id").get(getSingleUser)

router.route("/admin/user/:id").put(updateUser).delete(deleteUser); 


module.exports = router;

