const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
//some action to login user
router.post('/makeBet', userController.beting);
router.post('/gameHistory', userController.gameHistory);
// router.post('/myHistory', userController.myHistory);

router.post('/login', userController.login);
router.get('/login', (req, res) => {
    res.render('login', { data: 'empty' });
});
//some action to login user
router.post('/register', userController.register);
router.get('/register', (req, res) => {
    res.render('register');
});
module.exports = router;