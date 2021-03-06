require('dotenv/config');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mysqlConnection = require('./connection');
const userController = require('./bin/controller/user');

const CustomError = require('./bin/custom/error');
const moment = require('moment-timezone');
const middleware = require('./bin/middleware/auth');
const cors = require('cors');
const app = express();


//******* MIDDLEWARES ********\\
// app.use(require('morgan')(function(tokens, req, res) {
//     let dates = moment.tz(Date.now(), "Asia/Kolkata").toString().split(' ');
//     return [
//         req.headers.ip || req.ip,
//         dates[2] + dates[1].toUpperCase() + dates[3].slice(-2),
//         dates[4],
//         tokens.method(req, res),
//         tokens.url(req, res),
//         tokens.status(req, res),
//         tokens.res(req, res, 'content-length'), '-',
//         tokens['response-time'](req, res), 'ms'
//     ].join(' ')
// }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true, limit: '100mb' }));
app.use(require('body-parser').json({ limit: '100mb' }));
app.set('view engine', 'ejs');
app.use(express.static("public"));
// app.set('views', './bin/ejs/views')
app.use(session({
    secret: "newkpsecretkey",
    resave: false,
    saveUninitialized: false
}));



//******* IMPORTING ROUTES *******\\
const userRoutes = require('./bin/routes/user');
const cashierRoutes = require('./bin/routes/cashier');
const adminRoutes = require('./bin/routes/admin');


const { checkAdmin } = require('./bin/middleware/auth');





//******* USING THE IMPORTED ROUTES *******\\
app.use('/user', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, userRoutes);
app.use('/cashier', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, cashierRoutes);
app.use('/admin', (req, res, next) => { checkAdmin(req, res, next, ['admin'], 'login') }, adminRoutes);


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});
app.post('/login', userController.login);
app.get('/login', (req, res) => {
    if (req.query.status) {
        res.render('login', { status: req.query.status });

    } else {
        res.render('login', { status: 'empty' });

    }
});
//some action to login user
app.post('/register', userController.register);
app.get('/register', (req, res) => {
    if (req.query.status) {
        res.render('register', { domain: process.env.DOMAIN ,status:req.query.status,message:req.query.message});
        
    }else{
        res.render('register', { domain: process.env.DOMAIN ,status:'empty'});

    }


});
app.use('/', (req, res) => {
    res.render('login',{ status: 'empty' });
});


//******* ERROR HANDLING *******\\
app.use((req, res, next) => {
    const error = new CustomError('Not Found!', `Uh oh! the path you are trying to reach we can't find it, we've checked each an every corner!`, 404);
    next(error);

});

app.use((error, req, res, next) => {
    if (error.code > 500) next();
    console.log(error); //LOGGING ERROR!
    res.status(error.code || 500).json({
        error: true,
        details: error
    });
});

app.use((error, req, res, next) => {

    // console.log(error); //LOGGING ERROR!
    res.status(error.code || 500).json({
        error: true,
        details: error
    });
});




module.exports = app;