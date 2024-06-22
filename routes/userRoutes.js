const express = require('express');
const router = express.Router();
const user = require('../controllers/userController')
// const token = require('../middlewares/auth_middleware')
// const {upload} = require('../middlewares/imageStorage')
// const validation = require('../validation/user/user_validation')


router.post('/registerUser', 
// upload.single("profilepic"), validation.registerUserValidation ,
user.userSignup);
// router.get('/sendmail', user.sendMail)
router.post('/login', 
// validation.userloginvalidation, 
user.userLogin)
router.post('/send-reset-password-email', user.sendUserResetPasswordEmail);
router.post('/reset-password/:id/:token', user.userPasswordReset)

module.exports = router;