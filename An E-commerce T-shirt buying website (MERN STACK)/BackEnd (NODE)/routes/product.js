const express = require('express');
const router = express.Router()

const {getProductById, createProduct, getProduct, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")
const {isAdmin,isAuthenticated,isSignedin} = require('../controllers/Authentication');
const {getUserById} = require("../controllers/user")


router.param("userId", getUserById);
router.param("productId", getProductById);


router.post("/product/create/:userId", isSignedin, isAuthenticated, isAdmin, createProduct)

router.get("/product/:productId", getProduct)
// router.get("/product/photo/:productId", photo);


router.delete("/product/:product/:userId",isSignedin, isAuthenticated, isAdmin, deleteProduct)

router.put("/product/:product/:userId",isSignedin, isAuthenticated, isAdmin, updateProduct)


// product listing
router.get("/products",getAllProducts)

router.get("/products/categories", getAllUniqueCategories)

module.exports = router;