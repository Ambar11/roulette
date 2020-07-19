const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { checkAdmin } = require('../middleware/auth');
const functions = require('../custom/function');
const helpers = require('../custom/helper');
const { getTime } = require('../custom/helper');
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


router.post('/makeBet', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, userController.beting);


router.get('/gameTiming', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, (req, res) => {
    res.render('gameTiming', { data: 'empty' });
});
router.get('/myHistory', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, (req, res) => {
    res.render('myHistory', { data: 'empty' });
});
router.get('/playergameHistory', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, (req, res) => {
    res.render('playergameHistory', { data: 'empty' });
});
router.get('/playerHome', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, (req, res) => {
    res.render('playerHome', { data: 'empty' });
});
router.get('/play', (req, res, next) => { checkAdmin(req, res, next, ['user'], 'login') }, async(req, res) => {
    try {
        let userDetails = await functions.querySingle(`SELECT user.id,user.username,user.name,user.email,user.status,points.points FROM user INNER JOIN points ON user.id = points.u_id WHERE user.id = ${req.session.u_id} `);

        let checkGame = await functions.querySingle(`SELECT * FROM game WHERE status = 0 OR status = 1  ORDER BY id DESC`);
        // console.log(checkGame.length);


        if (checkGame.length > 0) {


            let SumBets = await functions.querySingle(`SELECT beting.number,SUM(beting.points) AS points,game.date FROM beting INNER JOIN game ON beting.game_id = game.id WHERE beting.u_id =${req.session.u_id} AND beting.game_id =${checkGame[0].id} GROUP BY beting.number `);

            let userBets = await functions.querySingle(`SELECT beting.game_id ,beting.number,beting.points,game.date,game.status FROM beting INNER JOIN game ON beting.game_id =  game.id WHERE beting.u_id = ${req.session.u_id} AND beting.game_id =${checkGame[0].id}`);
            let newBets = userBets;
            userBets.map((bets, j) => {
                return newBets[j].date = helpers.getTime(bets.date);

                // console.log(userBets[j]);

            });
            // console.log(newBets);
            res.render('play', { status: 0, data: newBets, user: userDetails[0], sum: SumBets });


        } else {
            // console.log(checkGame);

            res.render('play', { status: 1, data: checkGame[0], user: userDetails[0] });

        }
    } catch (error) {

    }

});
module.exports = router;