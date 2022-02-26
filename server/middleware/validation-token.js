const AppError = require('../managers/appError');
const TokenManager = require('../managers/token-manager');

module.exports = async (req, res, next) => {
    //const token = req.headers['token'] || req.query.token || req.body.token || req.headers.authorization;
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    if (token) {

        try {
            const decoded = await TokenManager.decode(token);
            if (decoded.email) {
                req.decoded = decoded;
                next();
            } else {
                res.status(401).json({
                    message:'Token not provided'
                    });
            }
        } catch (e) {
            //res.onError(new AppError('Token not provided', 401));
            res.status(401).json({
                message:'Invalid Token'
            });
        }
    } else {
        res.status(401).json({
            message:'Token not provided'
        });
        //res.onError(new AppError('Token not provided', 401));
    }
}

