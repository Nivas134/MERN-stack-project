const express = require('express');
const router = express.Router();

const {getUserById, getUser, allusers, updateUser, userPurchaseList} = require('../controllers/user')
const {isSignedin, isAuthenticated, isAdmin} = require('../controllers/Authentication')

router.param("userId",getUserById);

router.get("/user/:userId",isSignedin,isAuthenticated, getUser);

router.put("/user/:userId",isSignedin,isAuthenticated, updateUser)
router.get("/user/orders/:userId",isSignedin,isAuthenticated, userPurchaseList)


//An Assignment router
router.get('/users',allusers);


module.exports = router;