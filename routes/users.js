const express=require('express');
const router=express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);
router.get('/user',userController.name);

//Routing to Sign Up and Sign In

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

//create a route for Create user
router.post('/create', userController.create);

module.exports=router;