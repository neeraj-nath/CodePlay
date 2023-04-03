const express= require('express');
const router= express.Router();
const userController= require('../controllers/users_controller');
router.get('/profile',userController.profile);
router.get('/create-user',userController.signUp);
router.get('/create-session',userController.signIn);


module.exports=router;