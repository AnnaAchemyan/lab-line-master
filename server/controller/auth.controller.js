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


class AuthController {
    async sendEmail(req, res) {
        const {name, email, message} = req.body;
        await emailSender(`name - ${name} <br> email - ${email} <br> message - ${message}`);
        res.status(201).json({
            message: "success",
        })
    }

    async login(req, res) {
        try {
            const readFileAdmin = await fs.readFile('./admin.json', 'utf8');
            const admin = JSON.parse(readFileAdmin);
            const {email, password} = req.body;

            if (admin.email === email && await Bcrypt.compare(password, admin.password)) {
                const token = TokenManager.encode({
                    email: admin.email,
                }, 3600)
                res.status(201).json({
                    message: "success",
                    token
                })
            } else {
                throw new AppError('Email or password is incorrect', 403)
            }

        } catch (e) {
            res.status(e.httpStatus).json({
                message: e.message
            });
        }
    }

    async resetPassword(req, res) {
        try {
            const {oldPassword, newPassword, confirmPassword} = req.body;
            const readFileAdmin = await fs.readFile('./admin.json', 'utf8');
            const admin = JSON.parse(readFileAdmin);
            const bcryptCompare = await Bcrypt.compare(oldPassword, admin.password);
            if (!bcryptCompare) {
                throw new AppError('Old password is wrong', 403)
            } else if (newPassword === confirmPassword) {
                admin.password = await Bcrypt.hash(newPassword);
                await fs.writeFile('./admin.json', JSON.stringify(admin), 'utf8')
                res.status(201).json({
                    message: "success"
                })
            } else {
                throw new AppError('New password and confirm password does not coincide', 403)
            }
        } catch (e) {
            res.status(e.httpStatus).json({
                message: e.message
            });
        }
    }

    async sentEmailForgotPassword(req, res) {
        try {
            const readFileAdmin = await fs.readFile('./admin.json', 'utf8');
            const admin = JSON.parse(readFileAdmin);
            const token = TokenManager.encode({email: admin.email});
            await emailSender(`<a href="http://localhost:3000/forgot-password?activation-code=${token}">Forgot password</a>`)
            res.status(201).json({
                message: "Email sent"
            })
        } catch (e) {
            res.status(e.httpStatus).json({
                message: e.message
            });
        }
    }

    async forgotPassword(req, res) {
        try {
            const readFileAdmin = await fs.readFile('./admin.json', 'utf8');
            const admin = JSON.parse(readFileAdmin);
            const {newPassword, confirmPassword} = req.body;
            if (newPassword === confirmPassword) {
                admin.password = await Bcrypt.hash(newPassword);
                await fs.writeFile('./admin.json', JSON.stringify(admin), 'utf8')
                res.status(201).json({
                    message: "success"
                })
            } else {
                throw new AppError('Error', 403)
            }
        } catch (e) {
            res.status(e.httpStatus).json({
                message: e.message
            });
        }
    }

}


module.exports = new AuthController();