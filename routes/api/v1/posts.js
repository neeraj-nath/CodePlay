const express= require('express');
const router= express.Router();
const passport = require('passport');
const postApi = require('../../../controllers/api/v1/post_api');

router.get('/',postApi.index);
router.delete('/:id',passport.authenticate('jwt', {session:false}), postApi.destroy);
// in the above code, session is set as false to prevent creation of session cookies


module.exports= router;
