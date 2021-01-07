const express = require('express');
const router = express.Router()

const {isAdmin,isAuthenticated,isSignedin} = require('../controllers/Authentication');
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require('../controllers/product')

const { createOrder, getOrderById,getAllOrders,getOrderStatus,updateStatus } = require('../controllers/order')


router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post("/order/create/:userId",isAuthenticated,isSignedin,pushOrderInPurchaseList,updateStock,createOrder);

router.get("/order/all/:userId",isAuthenticated,isSignedin, getAllOrders);

//status of order
router.get("/order/status/:userId",isAuthenticated,isSignedin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedin,isAuthenticated,isAdmin,updateStatus)

module.exports = router;