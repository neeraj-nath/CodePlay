const express = require('express');
const router= express.Router();
//express.Router is a method which helps us divide the controller and routes from one another.
const homeController=require('../controllers/home_controller');

router.get('/', homeController.home);

module.exports=router;