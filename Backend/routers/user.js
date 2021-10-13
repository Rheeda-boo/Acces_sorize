 const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { signup, login } = require("../controller/user");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;