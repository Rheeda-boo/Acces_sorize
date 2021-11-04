const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const { addUser, addProduct, allProducts, allUsers, deleteUser, deleteProduct } = require("../controller/admin");

router.post("/adduser", addUser);
router.post("/addproduct", addProduct);

router.get("/allproducts", allProducts);
router.get("/allusers", allUsers);

router.delete("/deleteuser", deleteUser);
router.delete("/deleteproduct", deleteProduct);

module.exports = router;