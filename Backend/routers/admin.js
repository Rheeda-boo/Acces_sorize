const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const { addUser, addProduct } = require("../controller/admin");

router.post("/adduser", addUser);
router.post("/addproduct", addProduct);

module.exports = router;