const express = require('express');
const router = express.Router();
const userController = require('../controller/cashier');
const { checkAdmin } = require('../middleware/auth');
const functions = require('../custom/function');

//some action to login cashier
router.get('/logout', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
})
router.post('/cashierTransaction', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, userController.makeTransaction);
router.get('/getUsers', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, async(req, res) => {
    try {
        let getUsers = await functions.querySingle(`SELECT username FROM user WHERE status = 0 `);
        res.status(200).json({ users: getUsers });
    } catch (error) {
        res.status(401).json(error);

    }
});
router.get('/cashierPanel', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, (req, res) => {
    res.render('cashierHome', { data: req });
});

module.exports = router;