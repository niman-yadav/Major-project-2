const express= require('express');
const passport = require('passport');

const app = express();
const userController = require('../controllers/users_controller.js');

const router = express.Router();

router.get('/profile/:id' , passport.checkAuthentication , userController.users_profile);
router.post('/update/:id' , passport.checkAuthentication , userController.update);
router.get('/sign-up' , userController.signUp);
router.get('/sign-in' , userController.signIn);

router.post('/create' , userController.create);
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local' ,
    {failureRedirect:'/users/sign-in'},
    ) , userController.createSession);
router.get('/sign-out', userController.signOut);
module.exports = router;