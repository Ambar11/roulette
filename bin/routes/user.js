const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { checkAdmin } = require('../middleware/auth');

//some action to login user
router.post('/makeBet', userController.beting);
router.post('/gameHistory', userController.gameHistory);
// router.post('/myHistory', userController.myHistory);
router.get('/logout', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
});
router.post('/login', userController.login);
router.get('/login', (req, res) => {
    res.render('login', { data: 'empty' });
});
//some action to login user
router.post('/register', userController.register);
router.get('/register', (req, res) => {
    res.render('register');
});
router.get('/gameTiming', (req, res) => {
    res.render('gameTiming', { data: 'empty' });
});
router.get('/myHistory', (req, res) => {
    res.render('myHistory', { data: 'empty' });
});
router.get('/playergameHistory', (req, res) => {
    res.render('playergameHistory', { data: 'empty' });
});
router.get('/playerHome', (req, res) => {
    res.render('playerHome', { data: 'empty' });
});
router.get('/play', (req, res) => {
    res.render('play', { data: 'empty' });
});
module.exports = router;