const express = require('express');
const router = express.Router();
const { isSignedin, isAuthenticated } = require("../controllers/Authentication");
const { getToken, processPayment } = require('../controllers/paymentb');


router.get("/payment/gettoken/:userId",isSignedin, isAuthenticated, getToken)

router.post("/payment/braintree/userId", isSignedin, isAuthenticated, processPayment)

module.exports = router;