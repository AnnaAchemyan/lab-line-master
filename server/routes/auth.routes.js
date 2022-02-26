const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
//const imageController = require('../controller/image.controller')
const {body, query, check} = require("express-validator");
const upload = require('../middleware/upload')
const multer = require("multer");
const validationToken = require('../middleware/validation-token')


router.route('/sent').post(authController.sendEmail);

router.post('/login',
    body('email').exists(),
    body('password').exists(),
    authController.login
);

router.post('/reset-password',
    validationToken,
    body('oldPassword').exists(),
    body('newPassword').exists(),
    body('confirmPassword').exists(),
    authController.resetPassword
);

router.post('/email-forgot-password',
    authController.sentEmailForgotPassword
)

router.post('/forgot-password',
    authController.forgotPassword
)

module.exports = router;