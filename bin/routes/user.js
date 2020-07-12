const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
//some action to login user
router.post('/login', userController.login);
router.get('/login', (req, res) => {
    res.render('login', { data: 'empty' });
});
//some action to login user
router.post('/register', userController.register);

module.exports = router;