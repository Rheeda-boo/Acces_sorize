 const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { signup, login, checkEmail, forgotPassword } = require("../controller/user");

router.post("/signup", signup);
router.post("/login", login);

router.post("/checkemail", checkEmail);
router.put("/forgotpassword", forgotPassword);


module.exports = router;