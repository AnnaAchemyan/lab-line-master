const emailSender = require('../managers/email-manager');
const AppError = require('../managers/appError');
const TokenManager = require('../managers/token-manager');
const Bcrypt = require('../managers/bcrypt')
const email = require('../config/email')
const Image = require('../models/image')
const fs = require('fs').promises;
const path = require('path');
const upload = require('../middleware/upload')
const multer = require("multer");


class ImageController {

    async uploadImage(req,res){
        try {
            if(!req.body.type) {
                throw new AppError('please fill all fields', 400)
            }else{
                const image = new Image({
                    type: req.body.type,
                    // image: req.file ? req.file.path : "undefined",
                    image: req.file?.path
                })
                // console.log(req)
                res.status(201).json({
                    message: "success",
                    data: image
                })
                return  image.save()
            }
        }catch (e) {
            res.status(e.httpStatus).json({
                message: e.message
            });
            await fs.unlink(req.file.path)
        }
    }

    async deleteImage(req,res){

        try {
            const image = await Image.findById(req.params.id)
            if (image) {
                await fs.unlink(path.join(__homedir, image.image))
                await image.remove()
                res.json({
                    success: true,

                });
            } else {
                throw new Error('user not found');
            }
        } catch (e) {
            res.json({
                success: false,
                data: null,
                message: e.message
            });
        }
    }

    async getAllImages(req,res) {
        try{
            let images
            if(req.query.type){
                console.log(req.query.type)
                images = await Image.find({
                    type: req.query.type
                })
                // console.log(images)
            }else{
                images = await Image.find().limit(+req.query.limit).skip(+req.query.skip)
            }



            res.json({
                data: images,
            });
        }catch (e) {
            res.json({
                success: false,
                message: e.message
            });
        }

    }

}


module.exports = new ImageController();