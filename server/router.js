 module.exports = (app) => {
    app.use('/api/v1/', require('./routes/auth.routes'));
     app.use('/api/v1/', require('./routes/image.routes'));
};