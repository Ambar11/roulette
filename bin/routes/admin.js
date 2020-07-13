const express = require('express');
const router = express.Router();
const userController = require('../controller/admin');
const { checkAdmin } = require('../middleware/auth');



router.post('/startGame', userController.startGame);
router.post('/pauseGame', userController.pauseGame);

router.get('/adminPanel', (req, res, next) => { checkAdmin(req, res, next, ['cashier'], 'login') }, (req, res) => {
    res.render('adminPanel', { data: req });
});

module.exports = router;