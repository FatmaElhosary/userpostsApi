const router = require('express').Router();
// const userModel = require('../models/user.model')
const controller=require('../controllers/user.controller');
const validation=require('../controllers/validation.controller');
const authentication=require('../middleware/auth');
//const isLoggedIn=require('../middleware/auth')
router.get('/home',authentication,controller.getAllUsers);
router.post('/signup',validation.signupValidation,controller.signup);
router.post('/login',controller.login);
router.delete('/user/:id',controller.deleteUser);
router.patch('/user/:id',validation.updateUserValidation,controller.updateUser);

/////////posts //////////////////////
//get user posts
router.get('/posts/:userId',authentication,controller.getUserPosts);
//get all posts
router.get('/all-posts',authentication,controller.getAllPosts);
//add post
router.post('/add-post/:userId',authentication,validation.postValidation,controller.addPost);

//delete post get userId in url paramerters and get post id in body
router.delete('/delete-post/:userId',authentication,controller.deletePost);

//update post get userId in url paramerters and get post id in body
router.put('/update-post/:userId',authentication,validation.postValidation,controller.updatePost);

module.exports=router;