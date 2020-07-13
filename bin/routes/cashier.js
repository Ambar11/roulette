const express = require('express');
const router = express.Router();
const userController = require('../controller/cashier');
const { checkAdmin } = require('../middleware/auth');
//some action to login user
router.post('/cashierPanel', userController.makeTransaction);
router.get('/cashierPanel', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, (req, res) => {
    res.render('cashierPanel', { data: req });
});

module.exports = router;