const express = require('express')
const router = express.Router()
const auth = require('../controllers/Authentication')
const {check, validationResult}  = require('express-validator');

router.post('/signup',[


    // input body vladation with express-validator and custom error messages(Middleware)
    check('name').isLength({min: 3}).withMessage('name should be minimum of 3 characters'),
    check('name').isAlpha().withMessage('name must be alpha only'),
    check('email').isEmail().withMessage('Enter a valid email address'),
   check('password').isLength({min: 5}).withMessage('password length must be atleast 5 '),
],auth.signup);

router.get('/signout',auth.signout);

router.get("/testroute",auth.isSignedin,(req,res)=>{
    res.send("A protected route");
})

router.post('/signin',[

    // input body vladation with express-validator and custom error messages(Middleware)
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').isLength({min: 5}).withMessage('Enter a valid password'),
],auth.signin);

module.exports = router;