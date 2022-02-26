const express = require('express');
const router = express.Router();
//const authController = require('../controller/auth.controller');
const imageController = require('../controller/image.controller')
const {body, query, check} = require("express-validator");
const upload = require('../middleware/upload')
const multer = require("multer");
const validationToken = require('../middleware/validation-token')

router.post('/upload-image',
    validationToken,
    upload.single('image'),
    body('type').exists(),
    body('image').exists(),


    function (err, req, res, next) {
        if (err instanceof multer.MulterError) {
            res.json({ error: "Invalid File format. must be PNG,JPG,JPEG,GIF" })
        } else next();
    },
    imageController.uploadImage
)


router.delete('/delete-image/:id',
    validationToken,
    imageController.deleteImage
)

router.get('/get-all-images',
    imageController.getAllImages
)
module.exports = router;