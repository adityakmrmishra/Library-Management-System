const express = require('express');
const { registerUser, loginUser, logout,updateUser, deleteUser, getAllUser, getSingleUser, getUserDetails } = require('../controllers/userController');
const { isAuthenticatedUser} = require('../middleware/authentication');


const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/me").get( getUserDetails);

router.route("/admin/users").get(getAllUser);

router.route("/admin/user/:id").get(getSingleUser)

router.route("/admin/user/:id").put(updateUser).delete(deleteUser); 


module.exports = router;

