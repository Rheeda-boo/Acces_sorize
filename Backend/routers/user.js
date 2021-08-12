const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { signup } = require("../controller/user");

router.post("/signup", signup);


module.exports = router;