const express = require('express');
const router=express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/room',homeController.room);

router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports=router;