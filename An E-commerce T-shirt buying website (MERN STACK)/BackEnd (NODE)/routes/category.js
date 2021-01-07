const express = require('express');
const router = express.Router()

const {getCategoryId, createCategory, getCategory, getAllCategory, updateCategory, removeCategory}  = require("../controllers/category");
const {isAdmin,isAuthenticated,isSignedin} = require('../controllers/Authentication');
const {getUserById} = require("../controllers/user")


//params
router.param("userId",getUserById);
router.param("categoryId",getCategoryId);

//routes
router.post("/category/create/:userId", isSignedin, isAuthenticated, isAdmin, createCategory)
router.get("/category/:categoryId", getCategory) 
router.get("/categories", getAllCategory) 
router.put("/category/:categoryId/:userId" , isSignedin, isAuthenticated, isAdmin, updateCategory)

router.delete("/category/:categoryId/:userId" , isSignedin, isAuthenticated, isAdmin, removeCategory)

module.exports = router;
