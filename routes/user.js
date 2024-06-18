const express = require("express");
const router = express.Router()
const { login, forgotPassword, resetpassword, deleteUser, fetchAllUsers, fetchAllAdmins, fetchSingleUser, editUser } = require("../controller/user");
const { getMe } = require("../middleware/me");
const { onlyAdmin } = require("../middleware/auth");

const { register } = require("../controller/user/register")


// authentication
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").put(resetpassword);

// CRUD
router.route("/users").get(onlyAdmin, fetchAllUsers);
router.route("/admin").get(onlyAdmin, fetchAllAdmins);
router.route("/single/:id").get(onlyAdmin, fetchSingleUser)
router.route("/me").get(onlyAdmin, getMe, fetchSingleUser)
router.route("/delete/:id").delete(onlyAdmin, deleteUser);
router.route("/edit/:id").put(onlyAdmin, editUser);

module.exports = router