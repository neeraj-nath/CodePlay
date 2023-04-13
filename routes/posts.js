const express= require('express');
const router= express.Router();
const passport= require('passport');
const postsController= require('../controllers/posts_controller');


router.post('/create', passport.checkAuthenticaton, postsController.create);
router.get('/destroy/:id',passport.checkAuthenticaton, postsController.destroy);
module.exports=router;