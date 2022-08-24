const express = require("express");
const router = express.Router()
const { register, login, forgotPassword, resetpassword, deleteUser, fetchAllUsers, fetchAllAdmins, fetchSingleUser } = require("../controller/user");
const { getMe } = require("../middleware/me");
const { onlyAdmin } = require("../middleware/auth");

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
router.route("/delete/:id").delete(deleteUser);

module.exports = router