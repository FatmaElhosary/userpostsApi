const router = require('express').Router()
// const userModel = require('../models/user.model')
const controller=require('../controllers/user.controller')
const validation=require('../controllers/validation.controller')
//const isLoggedIn=require('../middleware/auth')


router.post('/signup',controller.signup);


module.exports=router;